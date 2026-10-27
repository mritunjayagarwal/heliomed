import type { ReactNode } from 'react'
import styles from './Eyebrow.module.css'

interface EyebrowProps {
  children: ReactNode
  tone?: 'dark' | 'gold'
  size?: 'xs' | 'sm' | 'md'
  className?: string
}

export function Eyebrow({ children, tone = 'dark', size = 'sm', className }: EyebrowProps) {
  return (
    <p className={[styles.eyebrow, styles[tone], styles[size], className].filter(Boolean).join(' ')}>
      {children}
    </p>
  )
}
