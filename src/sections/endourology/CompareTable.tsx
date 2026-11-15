import type { Product } from '@/data/catalog'
import styles from './Endourology.module.css'

// Built from each product's specs.rows, so the table follows the data file.
export function CompareTable({ title, products }: { title: string; products: Product[] }) {
  const labels = products[0]?.specs?.rows.map((row) => row.label) ?? []

  return (
    <section id="compare" className={`${styles.wrap} ${styles.section} ${styles.compare}`}>
      <h3 className={styles.compareTitle}>{title}</h3>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Spec</th>
              {products.map((p) => (
                <th key={p.id} scope="col">
                  {p.code}
                  {p.variantLabel && ` · ${p.variantLabel}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((label) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {products.map((p) => {
                  const row = p.specs?.rows.find((r) => r.label === label)
                  return <td key={p.id}>{row?.highlight ? <b>{row.value}</b> : row?.value}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
