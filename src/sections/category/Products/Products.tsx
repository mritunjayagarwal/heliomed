import { ArrowRightIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { ProductCard, type ProductCardData } from '@/components/ui/ProductCard/ProductCard'
import styles from './Products.module.css'

interface ProductsProps {
  eyebrow: string
  title: string
  lead: string
  items: (ProductCardData & { type: string })[]
}

export function Products({ eyebrow, title, lead, items }: ProductsProps) {
  return (
    <section id="products" className={styles.products} aria-labelledby="products-title">
      <div className="container">
        <div className={styles.header}>
          <div>
            <Eyebrow tone="gold" size="xs">
              {eyebrow}
            </Eyebrow>
            <h2 id="products-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.lead}>{lead}</p>
          </div>
          <AppLink href="/products" className={styles.viewAll}>
            View all products
            <ArrowRightIcon width={14} height={14} className={styles.arrow} />
          </AppLink>
        </div>

        <ul className={styles.grid}>
          {items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} label={product.type} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
