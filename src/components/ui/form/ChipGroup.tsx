import { useId } from 'react'
import styles from './Field.module.css'

interface ChipGroupProps {
  label: string
  options: readonly string[]
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

// Multi-select toggle chips; each chip is a button with aria-pressed.
export function ChipGroup({ label, options, value, onChange, className }: ChipGroupProps) {
  const labelId = useId()

  const toggle = (option: string) =>
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option])

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <div role="group" aria-labelledby={labelId} className={styles.chips}>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.chip}
            aria-pressed={value.includes(option)}
            onClick={() => toggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
