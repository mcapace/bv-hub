import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { timeline } from '../content'
import { Reveal } from './Reveal'
import { TimelineStory } from './TimelineStory'
import { ease } from '../lib/motion'
import './timeline.css'

/**
 * Interactive horizontal timeline, 1900 to the reopening.
 * Drag, scroll, use the arrow keys or buttons, or click a year on the rail.
 * Clicking a card opens the full story view.
 */
export function Timeline() {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [story, setStory] = useState<number | null>(null)

  // Scroll position maps linearly onto card centers: the first card is
  // current at the start, the last at the end, and goTo() is the inverse.
  const measure = () => {
    const el = scroller.current!
    const centers = Array.from(el.querySelectorAll<HTMLElement>('.tl-card')).map((c) => c.offsetLeft + c.offsetWidth / 2)
    const max = el.scrollWidth - el.clientWidth
    return { el, centers, max, first: centers[0], span: centers[centers.length - 1] - centers[0] }
  }

  const onScroll = useCallback(() => {
    if (!scroller.current) return
    const { el, centers, max, first, span } = measure()
    const p = max > 0 ? el.scrollLeft / max : 0
    setProgress(p)
    const line = first + p * span
    let best = 0
    centers.forEach((c, i) => {
      if (Math.abs(c - line) < Math.abs(centers[best] - line)) best = i
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

  const goTo = useCallback((i: number) => {
    if (!scroller.current) return
    const { el, centers, max, first, span } = measure()
    if (centers[i] === undefined) return
    setActive(i)
    el.scrollTo({ left: span > 0 ? (max * (centers[i] - first)) / span : 0, behavior: 'smooth' })
  }, [])

  const step = (dir: 1 | -1) => goTo(Math.min(timeline.length - 1, Math.max(0, active + dir)))

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return
    const keys: Record<string, () => void> = {
      ArrowRight: () => step(1),
      ArrowLeft: () => step(-1),
      Home: () => goTo(0),
      End: () => goTo(timeline.length - 1),
    }
    const run = keys[e.key]
    if (run) {
      e.preventDefault()
      run()
    }
  }

  // drag to scroll (mouse); a drag never opens a card
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const el = scroller.current!
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return
    const dx = e.clientX - drag.current.x
    if (!drag.current.moved && Math.abs(dx) > 6) {
      drag.current.moved = true
      scroller.current?.classList.add('is-dragging')
    }
    if (drag.current.moved) scroller.current!.scrollLeft = drag.current.left - dx
  }
  const endDrag = () => {
    drag.current.down = false
    scroller.current?.classList.remove('is-dragging')
  }
  const openStory = (i: number) => {
    if (drag.current.moved) {
      drag.current.moved = false
      return
    }
    setStory(i)
  }

  const closeStory = useCallback(() => {
    if (story !== null) goTo(story)
    setStory(null)
  }, [story, goTo])

  return (
    <section className="section timeline" id="timeline" data-chapter="1">
      <div className="container timeline__head">
        <Reveal>
          <span className="eyebrow">Interactive timeline</span>
          <h2 className="display display--lg">
            BV was there. <em>1900 to today.</em>
          </h2>
          <p className="timeline__hint">Drag, swipe or use the arrow keys. Select a year to read its story.</p>
        </Reveal>
        <Reveal delay={0.1} className="timeline__controls">
          <button className="tl-btn" aria-label="Previous year" onClick={() => step(-1)} disabled={active === 0}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 8H3M7 3.5 2.5 8 7 12.5" />
            </svg>
          </button>
          <button className="tl-btn" aria-label="Next year" onClick={() => step(1)} disabled={active === timeline.length - 1}>
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
        tabIndex={0}
        role="region"
        aria-label="Timeline, 1900 to today"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <ol className="timeline__track">
          {timeline.map((t, i) => (
            <motion.li
              key={t.year + t.title}
              className={`tl-card glass ${i === active ? 'is-active' : ''} ${t.image ? '' : 'tl-card--text'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, root: scroller, margin: '0px 10% 0px 0px' }}
              transition={{ duration: 0.9, ease, delay: Math.min(i, 4) * 0.08 }}
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
                <span className="tl-card__more" aria-hidden>
                  Read the story
                </span>
              </div>
              <button className="tl-card__open" onClick={() => openStory(i)} aria-label={`${t.year}, ${t.title}. Open story`} />
            </motion.li>
          ))}
          <li className="timeline__end">
            <span className="flourish">Quel beau lieu.</span>
            <span className="eyebrow eyebrow--muted">The story continues in Chapter II</span>
          </li>
        </ol>
      </div>

      <div className="container timeline__rail">
        <div className="timeline__rail-line">
          <div className="timeline__rail-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="timeline__years">
          {timeline.map((t, i) => (
            <button
              key={t.year + i}
              className={`timeline__year ${i === active ? 'is-active' : ''}`}
              aria-current={i === active ? 'step' : undefined}
              onClick={() => goTo(i)}
            >
              {t.year}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {story !== null && <TimelineStory index={story} onIndex={setStory} onClose={closeStory} />}
      </AnimatePresence>
    </section>
  )
}
