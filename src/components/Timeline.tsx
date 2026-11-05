import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { timeline } from '../content'
import { Reveal } from './Reveal'
import './timeline.css'

/**
 * Interactive horizontal timeline, 1900 to the reopening.
 * Drag, scroll, use the arrow buttons, or click a year on the rail.
 */
export function Timeline() {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  const onScroll = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.tl-card'))
    const center = el.scrollLeft + el.clientWidth * 0.38
    let best = 0
    let bestDist = Infinity
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const goTo = (i: number) => {
    const el = scroller.current
    if (!el) return
    const card = el.querySelectorAll<HTMLElement>('.tl-card')[i]
    if (!card) return
    el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
  }

  // drag to scroll (mouse)
  const drag = useRef({ down: false, x: 0, left: 0 })
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const el = scroller.current!
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft }
    el.classList.add('is-dragging')
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return
    scroller.current!.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }
  const endDrag = () => {
    drag.current.down = false
    scroller.current?.classList.remove('is-dragging')
  }

  return (
    <section className="section timeline" id="timeline">
      <div className="container timeline__head">
        <Reveal>
          <span className="eyebrow">Interactive timeline</span>
          <h2 className="display display--lg">
            BV was there. <em>1900 to today.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="timeline__controls">
          <button className="tl-btn" aria-label="Previous" onClick={() => goTo(Math.max(0, active - 1))}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 8H3M7 3.5 2.5 8 7 12.5" />
            </svg>
          </button>
          <button className="tl-btn" aria-label="Next" onClick={() => goTo(Math.min(timeline.length - 1, active + 1))}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </button>
        </Reveal>
      </div>

      <div
        ref={scroller}
        className="timeline__scroller"
        data-lenis-prevent
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div className="timeline__track">
          {timeline.map((t, i) => (
            <motion.article
              key={t.year + t.title}
              className={`tl-card glass ${i === active ? 'is-active' : ''} ${t.image ? '' : 'tl-card--text'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: scroller, margin: '0px 10% 0px 0px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 4) * 0.08 }}
            >
              {t.image && (
                <div className="tl-card__media">
                  <img src={t.image} alt="" loading="lazy" draggable={false} />
                </div>
              )}
              <div className="tl-card__body">
                <span className="tl-card__year">{t.year}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </motion.article>
          ))}
          <div className="timeline__end">
            <span className="script">Quel beau lieu.</span>
            <span className="eyebrow eyebrow--muted">The story continues in Chapter II</span>
          </div>
        </div>
      </div>

      <div className="container timeline__rail">
        <div className="timeline__rail-line">
          <div className="timeline__rail-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="timeline__years">
          {timeline.map((t, i) => (
            <button key={t.year + i} className={`timeline__year ${i === active ? 'is-active' : ''}`} onClick={() => goTo(i)}>
              {t.year}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
