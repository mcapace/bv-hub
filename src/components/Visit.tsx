import { motion } from 'framer-motion'
import { experiences, links } from '../content'
import { Reveal, item } from './Reveal'
import { Arrow } from './Hero'
import './visit.css'

export function Visit() {
  return (
    <section className="section visit" id="visit">
      <div className="visit__bg" aria-hidden>
        <img src="/img/vineyard-sign-drone.jpg" alt="" loading="lazy" />
      </div>
      <div className="container visit__inner">
        <div className="visit__intro">
          <Reveal>
            <span className="eyebrow">Plan your visit</span>
            <h2 className="display display--lg">
              Seven rooms, one courtyard, <em>and a table set since 1900.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              Hospitality has been central to BV since Georges and Fernande welcomed guests to the place the wine was
              grown. The new estate carries that tradition into a wine-first culinary program led by Winery Chef Sam
              McKenzie, with experiences for first-time visitors and seasoned collectors alike.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="visit__facts glass">
            <dl>
              <div>
                <dt className="eyebrow eyebrow--muted">Address</dt>
                <dd>1960 St. Helena Highway, Rutherford, Napa Valley</dd>
              </div>
              <div>
                <dt className="eyebrow eyebrow--muted">Hours</dt>
                <dd>Open daily, 10 AM to 5 PM. Reservations recommended.</dd>
              </div>
              <div>
                <dt className="eyebrow eyebrow--muted">Winemakers</dt>
                <dd>Nate Weis, Megan Twitchell, Lindsey Mongan</dd>
              </div>
            </dl>
            <div className="visit__facts-ctas">
              <a href={links.visit} target="_blank" rel="noreferrer" className="btn btn--solid">
                Reserve an experience <Arrow />
              </a>
              <a href={links.club} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Wine club
              </a>
            </div>
          </Reveal>
        </div>

        <motion.ul
          className="visit__list"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          {experiences.map((e) => (
            <motion.li key={e.name} variants={item} className="visit__exp glass">
              <div className="visit__exp-head">
                <h3>{e.name}</h3>
                <span className="visit__exp-meta">
                  <span>{e.price}</span>
                  <span className="visit__exp-dot" />
                  <span>{e.duration}</span>
                </span>
              </div>
              <p>{e.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
