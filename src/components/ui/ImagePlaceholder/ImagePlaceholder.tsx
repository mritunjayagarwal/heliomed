import { ImageIcon } from '@/components/icons'
import styles from './ImagePlaceholder.module.css'

interface ImagePlaceholderProps {
  label: string
  tone?: 'light' | 'dark'
  striped?: boolean
  className?: string
}

// Stand-in shown wherever a section's image key is still null.
export function ImagePlaceholder({ label, tone = 'light', striped = false, className }: ImagePlaceholderProps) {
  return (
    <div
      className={[styles.placeholder, styles[tone], striped && styles.striped, className].filter(Boolean).join(' ')}
      role="img"
      aria-label={label}
    >
      <ImageIcon width={32} height={32} strokeWidth={1.5} />
      <span>Image — {label}</span>
    </div>
  )
}
