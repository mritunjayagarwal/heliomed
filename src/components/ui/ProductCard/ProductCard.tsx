import { images } from '@/assets/images'
import { ArrowRightIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import styles from './ProductCard.module.css'

export interface ProductCardData {
  id: string
  categoryId: string
  name: string
  description: string
  image: { key: string | null; alt: string }
}

interface ProductCardProps {
  product: ProductCardData
  label: string
}

export function ProductCard({ product, label }: ProductCardProps) {
  const src = product.image.key ? images[product.image.key as keyof typeof images] : undefined

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {src ? (
          <img src={src} alt={product.image.alt} loading="lazy" />
        ) : (
          <span className={styles.placeholder}>Product image</span>
        )}
      </div>
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <AppLink
          href={`/products/${product.categoryId}/${product.id}`}
          className={styles.link}
          aria-label={`View ${product.name}`}
        >
          View product
          <ArrowRightIcon width={14} height={14} className={styles.arrow} />
        </AppLink>
      </div>
    </article>
  )
}
