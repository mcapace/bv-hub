import { motion, useScroll, useTransform } from 'framer-motion'
import { Suspense, lazy, useRef } from 'react'
const DustScene = lazy(() => import('./DustScene').then((m) => ({ default: m.DustScene })))
import { links } from '../content'
import { canUse3D } from '../lib/device'
import './hero.css'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const rise = useTransform(scrollYProgress, [0, 0.7], [0, -80])

  return (
    <section ref={ref} className="hero" id="top">
      <motion.div className="hero__media" style={{ y: imgY, scale: imgScale }}>
        <img src="/img/vineyard-fall-drone.jpg" alt="Beaulieu Vineyard estate vineyards in Rutherford at dawn" fetchPriority="high" />
      </motion.div>
      <div className="hero__veil" />
      {canUse3D && (
        <Suspense fallback={null}>
          <DustScene className="hero__dust" />
        </Suspense>
      )}

      <motion.div className="hero__content container" style={{ opacity: fade, y: rise }}>
        <motion.div
          className="hero__presenter"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow eyebrow--muted">Wine Spectator partner feature</span>
          <span className="hero__dot" />
          <span className="eyebrow">Presented by Beaulieu Vineyard</span>
        </motion.div>

        <motion.div
          className="hero__logo"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/brand/logo-gold.png" alt="Beaulieu Vineyard, since 1900" />
        </motion.div>

        <motion.h1
          className="display display--xl hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="flourish hero__flourish">Quel beau lieu.</span>
          A beautiful place,
          <br />
          <em>reimagined.</em>
        </motion.h1>

        <motion.p
          className="lede hero__lede"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          For 125 years, Napa Valley’s original Cabernet house has defined what Rutherford can be. Now the estate that
          Georges and Fernande de Latour founded in 1900 opens a new chapter. Over the coming months, Wine Spectator
          tells the story in four parts.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="btn" href="#chapter-1">
            Begin Chapter I <Arrow />
          </a>
          <a className="btn btn--ghost" href={links.visit} target="_blank" rel="noreferrer">
            Plan a visit
          </a>
        </motion.div>
      </motion.div>

      <div className="hero__scroll" aria-hidden>
        <span className="eyebrow eyebrow--muted">Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  )
}
