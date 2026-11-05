import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { timeline } from '../content'
import { useOverlay } from '../hooks/useOverlay'
import { ease } from '../lib/motion'

interface Props {
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

/** Full-screen reading view for a single timeline year. */
export function TimelineStory({ index, onIndex, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useOverlay(ref, true, onClose)

  const entry = timeline[index]
  const hasPrev = index > 0
  const hasNext = index < timeline.length - 1

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && index < timeline.length - 1) onIndex(index + 1)
      if (e.key === 'ArrowLeft' && index > 0) onIndex(index - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, onIndex])

  return (
    <motion.div
      ref={ref}
      className="tl-story"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tl-story-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="tl-story__panel glass"
        initial={{ y: 40, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.99 }}
        transition={{ duration: 0.7, ease }}
      >
        <button className="tl-story__close" onClick={onClose} data-autofocus>
          Close
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className={`tl-story__content ${entry.image ? '' : 'tl-story__content--text'}`}
            data-lenis-prevent
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="tl-story__media">
              {entry.image ? <img src={entry.image} alt="" /> : <span className="tl-story__bigyear">{entry.year}</span>}
            </div>
            <div className="tl-story__text">
              <span className="eyebrow">
                {entry.year} &nbsp;·&nbsp; {index + 1} of {timeline.length}
              </span>
              <h3 id="tl-story-title" className="display display--lg">
                {entry.title}
              </h3>
              <p className="lede">{entry.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="tl-story__nav">
          <button className="tl-btn" onClick={() => onIndex(index - 1)} disabled={!hasPrev} aria-label="Previous year">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 8H3M7 3.5 2.5 8 7 12.5" />
            </svg>
          </button>
          <div className="tl-story__dots" aria-hidden>
            {timeline.map((t, i) => (
              <span key={t.year + i} className={i === index ? 'is-active' : ''} />
            ))}
          </div>
          <button className="tl-btn" onClick={() => onIndex(index + 1)} disabled={!hasNext} aria-label="Next year">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
