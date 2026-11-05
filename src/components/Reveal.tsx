import { motion, type Variants } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { ease } from '../lib/motion'

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease, delay },
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
  chapter?: number
}

export function Reveal({ children, delay = 0, className, style, as = 'div', once = true, id, chapter }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      id={id}
      data-chapter={chapter}
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
