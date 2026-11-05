import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../lib/lenis'

export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, anchors: { offset: -20 } })
    setLenis(lenis)
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      setLenis(null)
      lenis.destroy()
    }
  }, [])
}
