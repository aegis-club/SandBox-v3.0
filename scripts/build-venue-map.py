"""Build the venue map from OpenStreetMap data.

Run: python3 -I scripts/build-venue-map.py
Output: src/assets/venue-map.json (SVG path data grouped by layer).

The idea follows originalankur/maptoposter: fetch the street network around one
point, then style the layers as a poster. This script writes vector paths, so
the site can theme and animate them instead of shipping a raster image.
Map data (c) OpenStreetMap contributors, ODbL.
"""

import json
import math
import sys
import urllib.parse
import urllib.request
from pathlib import Path

LAT, LON = 12.90949, 77.56595  # DSCE, from the OpenStreetMap node "Dayananda Sagar College"
RADIUS = 1500  # metres from the centre to the frame edge
SIZE = 1000  # viewBox units
ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
]
OUT = Path(__file__).resolve().parent.parent / "src" / "assets" / "venue-map.json"

def bbox(pad=1.15):
    dlat = RADIUS * pad / 111_320.0
    dlon = RADIUS * pad / (111_320.0 * math.cos(math.radians(LAT)))
    return f"{LAT - dlat:.5f},{LON - dlon:.5f},{LAT + dlat:.5f},{LON + dlon:.5f}"


QUERIES = [
    '[out:json][timeout:120][bbox:{bb}];way["highway"];out geom;',
    '[out:json][timeout:120][bbox:{bb}];(way["natural"="water"];way["waterway"];way["leisure"~"^(park|garden|pitch)$"];'
    'way["landuse"~"^(grass|recreation_ground)$"];way["railway"="rail"];way["amenity"~"^(college|university)$"];);out geom;',
]

MAJOR = {"motorway", "trunk", "primary", "motorway_link", "trunk_link", "primary_link"}
MID = {"secondary", "tertiary", "secondary_link", "tertiary_link"}
MINOR = {"residential", "unclassified", "living_street", "service", "road"}
PATHS = {"footway", "path", "pedestrian", "cycleway", "steps", "track"}


def fetch_one(query):
    body = urllib.parse.urlencode({"data": query}).encode()
    for attempt in range(3):
        for url in ENDPOINTS:
            try:
                req = urllib.request.Request(url, data=body, headers={"User-Agent": "map-poster-script/1.0"})
                with urllib.request.urlopen(req, timeout=150) as r:
                    return json.loads(r.read())["elements"]
            except Exception as e:  # try the next mirror
                print(f"{url}: {e}", file=sys.stderr)
    sys.exit("No Overpass endpoint answered.")


def fetch():
    bb = bbox()
    elements = []
    for q in QUERIES:
        elements += fetch_one(q.format(bb=bb))
    return {"elements": elements}


def project(lat, lon):
    """Equirectangular projection, metres from the centre, scaled to the viewBox."""
    m_lat = 111_320.0
    m_lon = 111_320.0 * math.cos(math.radians(LAT))
    x = (lon - LON) * m_lon
    y = (LAT - lat) * m_lat
    s = SIZE / (2 * RADIUS)
    return SIZE / 2 + x * s, SIZE / 2 + y * s


def simplify(pts, tol):
    """Ramer-Douglas-Peucker line simplification."""
    if len(pts) < 3:
        return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1
    norm = math.hypot(dx, dy) or 1e-9
    best, idx = 0.0, 0
    for i in range(1, len(pts) - 1):
        px, py = pts[i]
        d = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / norm
        if d > best:
            best, idx = d, i
    if best <= tol:
        return [pts[0], pts[-1]]
    return simplify(pts[: idx + 1], tol)[:-1] + simplify(pts[idx:], tol)


def inside(p, pad=40):
    return -pad <= p[0] <= SIZE + pad and -pad <= p[1] <= SIZE + pad


def to_d(pts, close=False):
    out = "M" + " ".join(f"{x:.1f} {y:.1f}" for x, y in pts)
    return out + ("Z" if close else "")


def main():
    data = fetch()
    layers = {k: [] for k in ("water", "green", "campus", "rail", "paths", "minor", "mid", "major")}
    for el in data.get("elements", []):
        geom = el.get("geometry")
        if not geom:
            continue
        pts = [project(g["lat"], g["lon"]) for g in geom]
        if not any(inside(p) for p in pts):
            continue
        t = el.get("tags", {})
        hw = t.get("highway")
        closed = pts[0] == pts[-1] and len(pts) > 3
        if t.get("amenity") in ("college", "university") and closed:
            layer, tol = "campus", 0.3
        elif t.get("natural") == "water" or t.get("waterway"):
            layer, tol = "water", 0.6
        elif t.get("leisure") or t.get("landuse"):
            layer, tol = "green", 0.8
        elif t.get("railway"):
            layer, tol = "rail", 0.5
        elif hw in MAJOR:
            layer, tol = "major", 0.4
        elif hw in MID:
            layer, tol = "mid", 0.5
        elif hw in MINOR:
            layer, tol = "minor", 0.6
        elif hw in PATHS:
            layer, tol = "paths", 0.8
        else:
            continue
        pts = simplify(pts, tol)
        if len(pts) < 2:
            continue
        layers[layer].append(to_d(pts, closed and layer in ("water", "green", "campus")))

    out = {
        "size": SIZE,
        "radiusMetres": RADIUS,
        "centre": [LAT, LON],
        "attribution": "© OpenStreetMap contributors",
        "layers": {k: "".join(v) for k, v in layers.items()},
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, separators=(",", ":")))
    counts = {k: len(v) for k, v in layers.items()}
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB) {counts}")


if __name__ == "__main__":
    main()
