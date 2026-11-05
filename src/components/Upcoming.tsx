import { Reveal } from './Reveal'
import { links } from '../content'
import './upcoming.css'

export function Upcoming() {
  return (
    <section className="section upcoming" id="chapter-3" data-chapter="3">
      <div className="container">
        <Reveal className="upcoming__head">
          <span className="eyebrow">Coming this spring</span>
          <h2 className="display display--lg">
            Still to come <em>in this story.</em>
          </h2>
        </Reveal>

        <div className="upcoming__grid">
          <Reveal className="upcoming__card glass">
            <div className="upcoming__media">
              <img src="/img/gdl-2021-top100.jpg" alt="Georges de Latour Private Reserve beside the Wine Spectator Top 100 issue" loading="lazy" />
            </div>
            <div className="upcoming__body">
              <span className="eyebrow eyebrow--muted">Chapter III &nbsp;·&nbsp; March 2027</span>
              <h3 className="display display--md">The ratings retrospective</h3>
              <p>
                An explorable archive of decades of Wine Spectator scores and tasting notes for BV, from the earliest
                reviewed vintages of the Private Reserve to the 2021 that placed No. 2 in the Top 100.
              </p>
            </div>
          </Reveal>

          <Reveal className="upcoming__card glass" delay={0.1}>
            <div className="upcoming__media">
              <img src="/img/fernande-andre.jpg" alt="Fernande de Latour with André Tchelistcheff" loading="lazy" />
            </div>
            <div className="upcoming__body">
              <span className="eyebrow eyebrow--muted">Chapter III &nbsp;·&nbsp; March 2027</span>
              <h3 className="display display--md">An immersive photo essay</h3>
              <p>
                Full-screen storytelling from the BV archive, now preserved at the UC Davis Library, set beside new
                photography of the reimagined estate.
              </p>
            </div>
          </Reveal>

          <Reveal className="upcoming__card glass" delay={0.15} id="chapter-4" chapter={4}>
            <div className="upcoming__media">
              <img src="/img/gdl-1949-bottles.jpg" alt="Historic bottles of Georges de Latour Private Reserve" loading="lazy" />
            </div>
            <div className="upcoming__body">
              <span className="eyebrow eyebrow--muted">Chapter IV &nbsp;·&nbsp; May 2027</span>
              <h3 className="display display--md">Private Reserve, vertical</h3>
              <p>
                A tasting across generations of the wine that has been poured for presidents, royalty and astronauts, and
                more than 180 scores of 90 points or higher since 1941.
              </p>
            </div>
          </Reveal>

          <Reveal className="upcoming__card upcoming__card--doc glass" delay={0.2}>
            <div className="upcoming__media">
              <img src="/img/documentary-1.jpg" alt="A still from the Stem and Barrel documentary" loading="lazy" />
            </div>
            <div className="upcoming__body">
              <span className="eyebrow eyebrow--muted">Now streaming</span>
              <h3 className="display display--md">Stem &amp; Barrel</h3>
              <p>A documentary on the people and the place behind Napa Valley’s original Cabernet house.</p>
              <a href={links.documentary} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Watch the trailer
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
