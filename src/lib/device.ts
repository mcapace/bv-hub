/**
 * Decides whether to render the WebGL scenes. They are skipped when the
 * visitor asks for less motion or data, when WebGL is unavailable, on
 * low-memory or low-core devices, or when `?nogl` is in the URL.
 */
function detect(): boolean {
  if (typeof window === 'undefined') return false
  if (new URLSearchParams(window.location.search).has('nogl')) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return false
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return false

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    return false
  }
  return true
}

export const canUse3D = detect()
