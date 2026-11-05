import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chapters, links } from '../content'
import './nav.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner glass">
          <a href="#top" className="nav__brand" aria-label="Beaulieu Vineyard">
            <img src="/brand/wordmark-gold.png" alt="Beaulieu Vineyard" />
          </a>

          <nav className="nav__links" aria-label="Chapters">
            {chapters.map((c, i) => (
              <a key={c.slug} href={`#chapter-${i + 1}`} className={`nav__link ${c.status !== 'live' ? 'nav__link--soon' : ''}`}>
                <span className="nav__num">{c.number}</span>
                {c.title}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a href={links.visit} target="_blank" rel="noreferrer" className="btn btn--solid nav__cta">
              Reserve
            </a>
            <button className="nav__burger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button className="menu__close" aria-label="Close menu" onClick={() => setOpen(false)}>
              Close
            </button>
            <div className="menu__list">
              {chapters.map((c, i) => (
                <motion.a
                  key={c.slug}
                  href={`#chapter-${i + 1}`}
                  onClick={() => setOpen(false)}
                  className="menu__item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="eyebrow">Chapter {c.number}</span>
                  <span className="display display--md">{c.title}</span>
                  <span className="menu__window">{c.window}</span>
                </motion.a>
              ))}
            </div>
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
