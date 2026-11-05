import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wines, links } from '../content'
import { BottleScene } from './BottleScene'
import { Reveal } from './Reveal'
import { Arrow } from './Hero'
import './wines.css'

export function Wines() {
  const [selected, setSelected] = useState(wines[0].id)
  const wine = wines.find((w) => w.id === selected)!

  return (
    <section className="section wines" id="wines">
      <div className="container wines__head">
        <Reveal>
          <span className="eyebrow">The wines</span>
          <h2 className="display display--lg">
            Rutherford, <em>in five expressions.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede">
            Select a bottle. BV has had only six head winemakers in 125 years, and every one has worked from the same
            gravelly benchland and the same conviction.
          </p>
        </Reveal>
      </div>

      <div className="wines__stage">
        <BottleScene wines={wines} selected={selected} onSelect={setSelected} />
        <div className="wines__floorglow" aria-hidden />
      </div>

      <div className="container wines__panel">
        <div className="wines__tabs" role="tablist">
          {wines.map((w) => (
            <button
              key={w.id}
              role="tab"
              aria-selected={w.id === selected}
              className={`wines__tab ${w.id === selected ? 'is-active' : ''}`}
              onClick={() => setSelected(w.id)}
            >
              {w.short}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={wine.id}
            className="wines__detail glass"
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wines__detail-main">
              <span className="eyebrow">{wine.tagline}</span>
              <h3 className="display display--md">{wine.name}</h3>
              <p>{wine.description}</p>
              {wine.accolade && <span className="wines__accolade">{wine.accolade}</span>}
            </div>
            <div className="wines__detail-side">
              <span className="wines__price">
                <span className="eyebrow eyebrow--muted">SRP</span>
                {wine.srp}
              </span>
              <a href={links.shop} target="_blank" rel="noreferrer" className="btn">
                Shop the wines <Arrow />
              </a>
              <a href={links.club} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Join the wine club
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
