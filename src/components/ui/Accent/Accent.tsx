import type { ReactNode } from 'react'
import styles from './Accent.module.css'

// Bold gold emphasis used inside headings ("modern urology", "into your OT.").
export function Accent({ children }: { children: ReactNode }) {
  return <span className={styles.accent}>{children}</span>
}
