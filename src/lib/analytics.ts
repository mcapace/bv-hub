import { track } from '@vercel/analytics'

/**
 * Lightweight event tracking on top of Vercel Web Analytics.
 * Page views and visitors are collected automatically by <Analytics />.
 * These custom events feed the wrap report: where readers click out to BV,
 * which chapters and wines they engage with, and how far they read.
 */

type Props = Record<string, string | number | boolean>

export function trackEvent(name: string, props: Props = {}) {
  try {
    track(name, props)
  } catch {
    /* analytics must never break the page */
  }
}

function sectionOf(el: Element): string {
  const host = el.closest('section, footer, header, [data-section]')
  if (!host) return 'page'
  return host.id || host.getAttribute('data-section') || host.className.split(' ')[0] || 'page'
}

/** One delegated listener covers every outbound link and in-page anchor. */
export function initClickTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      const label = (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60)
      const section = sectionOf(a)

      if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href)
          if (url.host !== window.location.host) {
            trackEvent('outbound_click', { dest: url.hostname.replace(/^www\./, ''), path: url.pathname, label, section })
          }
        } catch {
          /* ignore malformed hrefs */
        }
      } else if (href.startsWith('#') && href.length > 1) {
        trackEvent('anchor_nav', { target: href, label, section })
      }
    },
    { capture: true },
  )
}

/** Fires once per visit at 25, 50, 75 and 100 percent of page depth. */
export function initScrollDepth() {
  const marks = [25, 50, 75, 100]
  const seen = new Set<number>()
  const onScroll = () => {
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    if (max <= 0) return
    const pct = Math.round((window.scrollY / max) * 100)
    for (const m of marks) {
      if (pct >= m && !seen.has(m)) {
        seen.add(m)
        trackEvent('scroll_depth', { percent: m })
      }
    }
    if (seen.size === marks.length) window.removeEventListener('scroll', onScroll)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
}
