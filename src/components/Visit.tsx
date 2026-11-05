import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experiences, links, type Experience } from '../content'
import { Reveal } from './Reveal'
import { ease } from '../lib/motion'
import { Arrow } from './Hero'
import './visit.css'

export function Visit() {
  const [budget, setBudget] = useState('all')
  const [length, setLength] = useState('all')
  const budgetTest = budgets.find((o) => o.id === budget)!.test
  const lengthTest = lengths.find((o) => o.id === length)!.test
  const shown = experiences.filter((e) => budgetTest(e) && lengthTest(e))

  return (
    <section className="section visit" id="visit" data-chapter="2">
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

        <Reveal className="visit__planner" delay={0.1}>
          <div className="visit__filters" role="group" aria-label="Filter experiences">
            <FilterRow label="Budget" options={budgets} value={budget} onChange={setBudget} />
            <FilterRow label="Time" options={lengths} value={length} onChange={setLength} />
          </div>

          <p className="visit__count" aria-live="polite">
            {shown.length === experiences.length
              ? `${experiences.length} experiences`
              : `${shown.length} of ${experiences.length} experiences`}
          </p>

          <ul className="visit__list">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((e, i) => (
                <motion.li
                  key={e.name}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: i * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
                  className="visit__exp glass"
                >
                  <div className="visit__exp-head">
                    <h3>{e.name}</h3>
                    <span className="visit__exp-meta">
                      <span>{e.price}</span>
                      <span className="visit__exp-dot" />
                      <span>{e.duration}</span>
                    </span>
                  </div>
                  <p>{e.text}</p>
                  <a
                    href={links.visit}
                    target="_blank"
                    rel="noreferrer"
                    className="visit__exp-cta"
                    aria-label={`Reserve ${e.name}`}
                  >
                    Reserve <Arrow />
                  </a>
                </motion.li>
              ))}
            </AnimatePresence>
            {shown.length === 0 && (
              <li className="visit__empty glass">
                <p>No experience matches both filters.</p>
                <button
                  className="btn btn--ghost"
                  onClick={() => {
                    setBudget('all')
                    setLength('all')
                  }}
                >
                  Show all experiences
                </button>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

interface Option {
  id: string
  label: string
  test: (e: Experience) => boolean
}

const budgets: Option[] = [
  { id: 'all', label: 'Any', test: () => true },
  { id: 'under-100', label: 'Under $100', test: (e) => e.priceValue < 100 },
  { id: '100-300', label: '$100 to $300', test: (e) => e.priceValue >= 100 && e.priceValue <= 300 },
  { id: 'private', label: 'Private', test: (e) => e.priceValue > 300 },
]

const lengths: Option[] = [
  { id: 'all', label: 'Any', test: () => true },
  { id: 'hour', label: 'An hour', test: (e) => e.minutes <= 60 },
  { id: '90', label: '90 minutes', test: (e) => e.minutes === 90 },
  { id: 'long', label: 'Two hours or more', test: (e) => e.minutes >= 120 },
]

function FilterRow({ label, options, value, onChange }: { label: string; options: Option[]; value: string; onChange: (id: string) => void }) {
  return (
    <div className="visit__filter">
      <span className="visit__filter-label">{label}</span>
      <div className="visit__chips">
        {options.map((o) => (
          <button key={o.id} className={`visit__chip ${value === o.id ? 'is-active' : ''}`} aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
