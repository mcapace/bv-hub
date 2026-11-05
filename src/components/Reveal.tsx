import { motion, type Variants } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  as?: 'div' | 'section' | 'p' | 'h1' | 'h2' | 'h3' | 'figure' | 'li'
  id?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, className, style, as = 'div', once = true, id }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      id={id}
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      custom={delay}
    >
      {children}
    </Tag>
  )
}

export function Stagger({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ staggerChildren: 0.12 }}
    >
      {children}
    </motion.div>
  )
}

export const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}
