import { motion } from 'framer-motion'
import { chapters } from '../content'
import { Reveal } from './Reveal'
import { item } from '../lib/motion'
import './chapters.css'

const statusLabel = { live: 'Now live', next: 'Opening January', upcoming: 'Coming' }

export function Chapters() {
  return (
    <section className="section section--burgundy chapters" id="chapters">
      <div className="container">
        <Reveal className="chapters__head">
          <span className="eyebrow">A story in four chapters</span>
          <h2 className="display display--lg">
            From the first vine <em>to the next century.</em>
          </h2>
          <p className="lede">
            This hub grows through June 2027. Each chapter brings a new Wine Spectator feature, new imagery from the
            Rutherford archive, and new ways to experience the estate.
          </p>
        </Reveal>

        <motion.ol
          className="chapters__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.14 }}
        >
          {chapters.map((c, i) => (
            <motion.li key={c.slug} variants={item} className={`chapter-card chapter-card--${c.status}`}>
              <a href={c.status === 'live' ? '#chapter-1' : `#chapter-${i + 1}`} className="chapter-card__link">
                <div className="chapter-card__media">
                  <img src={c.image} alt="" loading="lazy" />
                </div>
                <div className="chapter-card__body glass">
                  <div className="chapter-card__top">
                    <span className="chapter-card__num">{c.number}</span>
                    <span className={`chapter-card__status chapter-card__status--${c.status}`}>{statusLabel[c.status]}</span>
                  </div>
                  <h3 className="display display--md">{c.title}</h3>
                  <span className="chapter-card__feature">{c.feature}</span>
                  <p>{c.summary}</p>
                  <span className="chapter-card__window eyebrow eyebrow--muted">{c.window}</span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
