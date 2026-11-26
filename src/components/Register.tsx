import { MLH } from "../data";
import { Arrow } from "./Hero";
import { StripTitle } from "./Strip";

export function Register() {
  return (
    <section className="band band--yellow grid-field" id="register" aria-labelledby="reg-title">
      <StripTitle id="reg-title" tone="paper" cap="2027">
        Request entry.
      </StripTitle>
      <div className="wrap register">
        <div>
          <p className="register__status">
            <i aria-hidden="true" />
            Registration for 2027 is not open yet.
          </p>
          <p className="lead">
            The form and the 2027 dates arrive together. Until then, three things are worth doing.
          </p>
        </div>
        <div className="register__body">
          <ol className="prep">
            <li>
              <a href="#territories">Pick a territory</a>
              <span>Eight zones are open. Read the briefings and choose where you want to operate.</span>
            </li>
            <li>
              <b>Find your people</b>
              <span>Bring a team, or come solo. Team finder opens with registration.</span>
            </li>
            <li>
              <a href={MLH} target="_blank" rel="noreferrer">
                Read the code of conduct<span className="sr"> (opens in a new tab)</span>
              </a>
              <span>Every entrant agrees to the MLH Code of Conduct.</span>
            </li>
          </ol>
          <a className="btn btn--ink" href="#territories">
            <span>Explore territories</span>
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
