import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import styles from './Benefits.module.css'

interface BenefitsProps {
  eyebrow: string
  title: string
  items: { title: string; description: string }[]
}

export function Benefits({ eyebrow, title, items }: BenefitsProps) {
  return (
    <section className={styles.benefits} aria-labelledby="benefits-title">
      <div className="container">
        <Eyebrow tone="gold" size="xs">
          {eyebrow}
        </Eyebrow>
        <h2 id="benefits-title" className={styles.title}>
          {title}
        </h2>

        <ol className={styles.grid}>
          {items.map((item, i) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
