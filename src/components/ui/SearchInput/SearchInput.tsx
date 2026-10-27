import type { InputHTMLAttributes } from 'react'
import { SearchIcon } from '@/components/icons'
import styles from './SearchInput.module.css'

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
}

// Collapsed to an icon; clicking the icon focuses the input, which expands it.
export function SearchInput({ label = 'Search', className, ...props }: SearchInputProps) {
  return (
    <label className={[styles.field, className].filter(Boolean).join(' ')}>
      <span className={styles.iconWrap}>
        <SearchIcon className={styles.icon} />
      </span>
      <span className="visually-hidden">{label}</span>
      <input type="search" className={styles.input} placeholder={`${label} products`} {...props} />
    </label>
  )
}
