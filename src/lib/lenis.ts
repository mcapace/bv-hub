import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function getLenis() {
  return instance
}

/** Scrolls to an in-page anchor, through Lenis when it is running. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash)
  if (!el) return
  if (instance) instance.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
