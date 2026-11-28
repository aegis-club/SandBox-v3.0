import { describe, expect, it } from "vitest";
import { END, hplus, pad, previewTarget, START, stageAt } from "../../src/components/Clock";

const HOUR = 3_600_000;

describe("event clock", () => {
  it("makes the event exactly 24 hours long", () => {
    expect(END - START).toBe(24 * HOUR);
  });

  it("puts each moment in the right stage", () => {
    expect(stageAt(START - 1)).toBe("before");
    expect(stageAt(START)).toBe("live");
    expect(stageAt(END - 1)).toBe("live");
    expect(stageAt(END)).toBe("after");
  });

  it("sends each preview mode to a moment in that stage", () => {
    const now = START - 100 * 24 * HOUR;
    expect(stageAt(previewTarget("before", now))).toBe("before");
    expect(stageAt(previewTarget("live", now))).toBe("live");
    expect(stageAt(previewTarget("after", now))).toBe("after");
    expect(previewTarget("real", now)).toBe(now);
  });

  it("formats elapsed time as H+hh:mm:ss", () => {
    expect(hplus(0)).toBe("H+00:00:00");
    expect(hplus(7.5 * HOUR + 9_000)).toBe("H+07:30:09");
    expect(hplus(-5_000)).toBe("H+00:00:00");
  });

  it("pads numbers and never shows a negative", () => {
    expect(pad(5)).toBe("05");
    expect(pad(5, 3)).toBe("005");
    expect(pad(-3)).toBe("00");
    expect(pad(7.9)).toBe("07");
  });
});
