import { useId, type TextareaHTMLAttributes } from 'react'
import styles from './Field.module.css'

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string
  error?: string
}

export function TextArea({ label, error, required, className, ...props }: TextAreaProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={[styles.field, error && styles.invalid, className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        className={styles.textarea}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}
