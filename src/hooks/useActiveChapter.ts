import { useEffect, useState } from 'react'

/**
 * Returns the number of the chapter the reader is in (1-based, 0 for none),
 * based on elements marked with `data-chapter`. Nested markers win over
 * their parents because they come later in document order.
 */
export function useActiveChapter() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let current = 0
      document.querySelectorAll<HTMLElement>('[data-chapter]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) current = Number(el.dataset.chapter)
      })
      setActive(current)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return active
}
