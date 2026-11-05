import { useEffect, useRef, type RefObject } from 'react'
import { getLenis } from '../lib/lenis'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Behaviour shared by full-screen overlays (menu, timeline story view):
 * locks page scroll, moves focus inside, keeps Tab within the overlay,
 * closes on Escape, and returns focus to the opener on close.
 */
export function useOverlay(ref: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    getLenis()?.stop()

    const focusFirst = requestAnimationFrame(() => {
      const first = ref.current?.querySelector<HTMLElement>('[data-autofocus]') ?? ref.current?.querySelector<HTMLElement>(FOCUSABLE)
      first?.focus({ preventScroll: true })
    })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !ref.current) return
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(focusFirst)
      document.removeEventListener('keydown', onKey)
      root.style.overflow = prevOverflow
      getLenis()?.start()
      opener?.focus({ preventScroll: true })
    }
  }, [open, ref])
}
