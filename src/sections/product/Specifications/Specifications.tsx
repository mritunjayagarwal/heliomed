import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import styles from './Specifications.module.css'

interface SpecificationsProps {
  eyebrow: string
  title: string
  note: string
  rows: { label: string; value: string }[]
}

export function Specifications({ eyebrow, title, note, rows }: SpecificationsProps) {
  return (
    <section className={styles.specs} aria-labelledby="specs-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <Eyebrow tone="gold" size="xs">
            {eyebrow}
          </Eyebrow>
          <h2 id="specs-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.note}>{note}</p>
        </div>

        <dl className={styles.table}>
          {rows.map((row) => (
            <div key={row.label} className={styles.row}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
