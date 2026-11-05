import type { Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

export const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}
