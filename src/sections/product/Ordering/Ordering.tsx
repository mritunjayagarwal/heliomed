import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import styles from './Ordering.module.css'

interface OrderingProps {
  variants: { code: string; size: string; length: string; pack: string }[]
}

export function Ordering({ variants }: OrderingProps) {
  return (
    <section className={styles.ordering} aria-labelledby="ordering-title">
      <div className="container">
        <Eyebrow size="xs">Ordering information</Eyebrow>
        <h2 id="ordering-title" className={styles.title}>
          Variants and codes
        </h2>

        <div className={styles.scroller}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Product code</th>
                <th scope="col">Size</th>
                <th scope="col">Length</th>
                <th scope="col">Pack size</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, i) => (
                <tr key={i}>
                  <td>{variant.code}</td>
                  <td>{variant.size}</td>
                  <td>{variant.length}</td>
                  <td>{variant.pack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
