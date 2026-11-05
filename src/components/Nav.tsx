import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { chapters, links } from '../content'
import { useActiveChapter } from '../hooks/useActiveChapter'
import { useOverlay } from '../hooks/useOverlay'
import { scrollToHash } from '../lib/lenis'
import './nav.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveChapter()
  const menuRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback(() => setOpen(false), [])
  useOverlay(menuRef, open, close)

  const goFromMenu = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault()
    setOpen(false)
    window.setTimeout(() => scrollToHash(hash), 60)
  }

  return (
    <>
      <a href="#chapter-1" className="skip-link">
        Skip to the story
      </a>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner glass">
          <a href="#top" className="nav__brand" aria-label="Beaulieu Vineyard, back to top">
            <img src="/brand/wordmark-gold.png" alt="" />
          </a>

          <nav className="nav__links" aria-label="Chapters">
            {chapters.map((c, i) => (
              <a
                key={c.slug}
                href={`#chapter-${i + 1}`}
                className={`nav__link ${c.status !== 'live' ? 'nav__link--soon' : ''} ${active === i + 1 ? 'is-active' : ''}`}
                aria-current={active === i + 1 ? 'location' : undefined}
              >
                <span className="nav__num">{c.number}</span>
                {c.title}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a href={links.visit} target="_blank" rel="noreferrer" className="btn btn--solid nav__cta">
              Reserve
            </a>
            <button
              className="nav__burger"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
          <motion.span className="nav__progress" style={{ scaleX: progress }} aria-hidden />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="site-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Chapters"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="menu__top">
              <img src="/brand/wordmark-gold.png" alt="Beaulieu Vineyard" className="menu__brand" />
              <button className="menu__close" onClick={close}>
                Close
              </button>
            </div>
            <nav className="menu__list" aria-label="Chapters">
              {chapters.map((c, i) => (
                <motion.a
                  key={c.slug}
                  href={`#chapter-${i + 1}`}
                  onClick={(e) => goFromMenu(e, `#chapter-${i + 1}`)}
                  className={`menu__item ${active === i + 1 ? 'is-active' : ''}`}
                  aria-current={active === i + 1 ? 'location' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="eyebrow">
                    Chapter {c.number}
                    {c.status === 'live' && <span className="menu__live">Now live</span>}
                  </span>
                  <span className="display display--md">{c.title}</span>
                  <span className="menu__window">{c.window}</span>
                </motion.a>
              ))}
            </nav>
            <div className="menu__foot">
              <a href={links.visit} target="_blank" rel="noreferrer" className="btn">
                Plan a visit
              </a>
              <a href={links.shop} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Shop the wines
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
