import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wines, links } from '../content'
import { canUse3D } from '../lib/device'
import { ease } from '../lib/motion'
const BottleScene = lazy(() => import('./BottleScene').then((m) => ({ default: m.BottleScene })))
import { BottleRow } from './BottleRow'
import { Reveal } from './Reveal'
import { Arrow } from './Hero'
import './wines.css'

export function Wines() {
  const [selected, setSelected] = useState(wines[0].id)
  const index = wines.findIndex((w) => w.id === selected)
  const wine = wines[index]
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const tablist = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = tablist.current
    const tab = tabs.current[index]
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
  }, [index])

  const select = (i: number, focus = false) => {
    const next = (i + wines.length) % wines.length
    setSelected(wines[next].id)
    if (focus) tabs.current[next]?.focus()
  }

  const onTabKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: wines.length - 1 }
    if (e.key in keys) {
      e.preventDefault()
      select(keys[e.key], true)
    }
  }

  // horizontal swipe on the stage (touch and pen)
  const swipe = useRef<{ x: number; y: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return
    swipe.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipe.current
    swipe.current = null
    if (!start) return
    const dx = e.clientX - start.x
    const dy = e.clientY - start.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) select(index + (dx < 0 ? 1 : -1))
  }

  return (
    <section className="section wines" id="wines" data-chapter="1">
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

      <div className="wines__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (swipe.current = null)}>
        {canUse3D ? (
          <Suspense fallback={<BottleRow wines={wines} selected={selected} onSelect={setSelected} />}>
            <BottleScene wines={wines} selected={selected} onSelect={setSelected} />
          </Suspense>
        ) : (
          <BottleRow wines={wines} selected={selected} onSelect={setSelected} />
        )}
        <div className="wines__floorglow" aria-hidden />
        <button className="wines__step wines__step--prev tl-btn" onClick={() => select(index - 1)} aria-label="Previous wine">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 8H3M7 3.5 2.5 8 7 12.5" />
          </svg>
        </button>
        <button className="wines__step wines__step--next tl-btn" onClick={() => select(index + 1)} aria-label="Next wine">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </button>
      </div>

      <div className="container wines__panel">
        <div ref={tablist} className="wines__tabs" role="tablist" aria-label="Wines" onKeyDown={onTabKey} data-lenis-prevent>
          {wines.map((w, i) => (
            <button
              key={w.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              id={`wine-tab-${w.id}`}
              aria-selected={w.id === selected}
              aria-controls="wine-panel"
              tabIndex={w.id === selected ? 0 : -1}
              className={`wines__tab ${w.id === selected ? 'is-active' : ''}`}
              onClick={() => setSelected(w.id)}
            >
              {w.short}
            </button>
          ))}
        </div>

        <div id="wine-panel" role="tabpanel" aria-labelledby={`wine-tab-${wine.id}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={wine.id}
              className="wines__detail glass"
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="wines__detail-main">
                <span className="eyebrow">{wine.tagline}</span>
                <h3 className="display display--md">{wine.name}</h3>
                <p>{wine.description}</p>
                {wine.accolade && <span className="wines__accolade">{wine.accolade}</span>}
              </div>
              <div className="wines__detail-side">
                <span className="wines__price">
                  <span className="eyebrow eyebrow--muted">Suggested retail</span>
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
      </div>
    </section>
  )
}
