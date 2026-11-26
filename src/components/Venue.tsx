import { DIRECTIONS } from "../data";
import { Arrow } from "./Hero";
import { Title } from "./Reveal";
import { VenueMap } from "./VenueMap";

export function Venue() {
  return (
    <section className="band band--paper" id="venue" aria-labelledby="venue-title">
      <div className="wrap venue">
        <div className="venue__text">
          <Title id="venue-title" from="bottom">
            Your destination.
          </Title>
          <p className="venue__name">Dayananda Sagar College of Engineering</p>
          <p className="lead">Kumaraswamy Layout, Bengaluru, Karnataka</p>
          <a className="btn btn--ink" href={DIRECTIONS} target="_blank" rel="noreferrer">
            <span>Get directions</span>
            <Arrow />
            <span className="sr">(opens in a new tab)</span>
          </a>
        </div>
        <VenueMap />
      </div>
    </section>
  );
}
