import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from './Reveal'
import { links } from '../content'
import { Arrow } from './Hero'
import './story.css'

function Parallax({ src, alt, from = 40, to = -40, className = '' }: { src: string; alt: string; from?: number; to?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [from, to])
  return (
    <div ref={ref} className={`img-frame story__img ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.12 }} loading="lazy" />
    </div>
  )
}

export function Story() {
  return (
    <section className="section section--paper story" id="chapter-1" data-chapter="1">
      <div className="container">
        <Reveal className="story__head">
          <span className="eyebrow">Chapter I &nbsp;·&nbsp; Anticipation</span>
          <h2 className="display display--xl">
            The House <br />
            That Latour Built
          </h2>
          <p className="lede">
            In 1900 Napa Valley was planted to walnuts and prunes. A French immigrant with a cream of tartar business
            and his wife, who could name a place in three words, saw something else.
          </p>
        </Reveal>

        <div className="story__layout">
          <div className="story__col story__col--text">
            <Reveal className="body dropcap">
              <p>
                Fernande de Latour took one look at the Rutherford expanse where the winery sits today and exclaimed{' '}
                <em>“Quel beau lieu,”</em> what a beautiful place. Georges sold his thriving business, bought a four-acre
                ranch, and founded Beaulieu Vineyard with the ambition of making wines that would rival those of their
                homeland. With Georges as general manager and Fernande as director, they joined the earliest ranks of
                California’s winemaking pioneers: Krug, Niebaum, Beringer, Yount.
              </p>
              <p>
                Before the region had a formal identity, BV championed the importance of place, labeling Rutherford
                Cabernet Sauvignon as early as 1919, decades ahead of appellation recognition. When phylloxera ravaged
                California’s vineyards, Georges imported disease-resistant rootstock from Europe and shared it with his
                neighbors, strengthening the future of the valley as a whole.
              </p>
            </Reveal>

            <Reveal className="story__quote glass glass--light" delay={0.1}>
              <span className="story__quote-mark" aria-hidden>“</span>
              <blockquote>
                Fernande’s foresight kept BV open through Prohibition. Sacramental wine for the Catholic Church made it one
                of the only Napa wineries to stay in production, and production grew fourfold.
              </blockquote>
            </Reveal>

            <Reveal className="body" delay={0.05}>
              <p>
                Upon Georges’ death in 1940 the board immediately named Fernande president. She was the only female
                founding member of the Napa Valley Vintners, an honorary director of the Wine Institute, and the woman
                who organized an influential tasting of BV wines in Paris long before the Judgment of Paris. She visited
                the King and Queen at Buckingham Palace, and the Private Reserve would soon be poured for them.
              </p>
              <p>
                Across more than a century, BV has evolved while staying grounded in balance, structure and longevity.
                Its leadership is measured not in vintages, but in generations.
              </p>
            </Reveal>

            <Reveal className="story__cta" delay={0.1}>
              <a href={links.about} target="_blank" rel="noreferrer" className="btn btn--ghost">
                The origins of Beaulieu <Arrow />
              </a>
            </Reveal>
          </div>

          <div className="story__col story__col--media">
            <Reveal>
              <figure className="story__figure">
                <Parallax src="/img/georges-de-latour.jpg" alt="Portrait of Georges de Latour" />
                <figcaption className="caption">Georges de Latour, founder</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="story__figure story__figure--offset">
                <Parallax src="/img/vineyard-workers-picnic.jpg" alt="Vineyard workers at a picnic in the early days of Beaulieu Vineyard" from={30} to={-50} />
                <figcaption className="caption">Vineyard crew, BV Ranch, early 1900s</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.15}>
              <figure className="story__figure">
                <Parallax src="/img/winery-exterior-archive.jpg" alt="The 1885 stone winery that became the home of Beaulieu Vineyard" from={20} to={-30} />
                <figcaption className="caption">The 1885 stone winery, purchased 1923</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
