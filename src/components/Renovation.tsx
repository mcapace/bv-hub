import { motion } from 'framer-motion'
import { renovation, links } from '../content'
import { Reveal } from './Reveal'
import { item } from '../lib/motion'
import { Arrow } from './Hero'
import './renovation.css'

export function Renovation() {
  return (
    <section className="section section--paper renovation" id="chapter-2" data-chapter="2">
      <div className="container">
        <div className="renovation__grid">
          <div className="renovation__text">
            <Reveal>
              <span className="eyebrow">Chapter II &nbsp;·&nbsp; The Return &nbsp;·&nbsp; January 2027</span>
              <h2 className="display display--lg">
                Inside the reopening <br />
                <em>of Beaulieu Vineyard.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="body">
              <p>
                In 2024 BV embarked on the most significant transformation of its Rutherford estate in generations. The
                project removed decades of additions that had obscured the original 1880s stone winery, reestablished
                its historic features, and created an arrival sequence that reconnects visitors to the vineyards and a
                new culinary garden from the moment they enter.
              </p>
              <p>
                Redwood salvaged from old wine tanks became ceilings. Georges de Latour’s 1925 Cadillac now greets guests
                in the entrance hall beside a statue of the Maestro. Completed in 2026, the estate opens with seven
                tasting spaces, a dedicated club lounge, and BV’s first culinary program.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="renovation__ctas">
              <a href={links.renovation} target="_blank" rel="noreferrer" className="btn btn--solid">
                Where heritage meets the next chapter <Arrow />
              </a>
            </Reveal>
          </div>

          <div className="renovation__media">
            <Reveal className="img-frame renovation__img renovation__img--main">
              <img src="/img/construction-drone.jpg" alt="Aerial view of the Beaulieu Vineyard winery during renovation" loading="lazy" />
            </Reveal>
            <Reveal delay={0.1} className="img-frame renovation__img renovation__img--small">
              <img src="/img/hand-on-bumper.jpg" alt="Georges de Latour’s 1925 Cadillac in the new entrance hall" loading="lazy" />
            </Reveal>
            <Reveal delay={0.15} className="img-frame renovation__img renovation__img--small2">
              <img src="/img/construction-sign-closeup.jpg" alt="The original Beaulieu Vineyard sign, restored" loading="lazy" />
            </Reveal>
          </div>
        </div>

        <motion.ul
          className="renovation__stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {renovation.stats.map((s) => (
            <motion.li key={s.label} variants={item} className="glass glass--light renovation__stat">
              <span className="renovation__value">{s.value}</span>
              <span className="renovation__label">{s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
