import { AppLink } from '@/components/ui/AppLink/AppLink'
import { interestHref, isAvailable, productHref, productImage, quoteHrefFor, type Product } from '@/data/catalog'
import styles from './Endourology.module.css'

interface DeviceImageProps {
  product: Product | undefined
  width?: number
  height: number
  dark?: boolean
}

// Product photo, or the dashed placeholder while a product has no image yet.
export function DeviceImage({ product, width, height, dark = false }: DeviceImageProps) {
  const src = product && productImage(product)
  if (src) {
    return <img src={src} alt={product.image.alt} loading="lazy" className={styles.photo} style={{ width, height }} />
  }
  return (
    <div className={`${styles.ph} ${dark ? styles.phDark : ''}`} style={{ width, height }}>
      {width ? 'image' : 'Product image'}
    </div>
  )
}

interface DeviceCardProps {
  product: Product
  dim: boolean
  compact?: boolean
}

export function DeviceCard({ product, dim, compact = false }: DeviceCardProps) {
  const available = isAvailable(product)

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`} data-dim={dim}>
      <DeviceImage product={product} height={compact ? 130 : 170} />
      <div className={styles.cardMeta}>
        <span className={styles.code}>{product.code}</span>
        {product.tag && <span className={styles.tag}>{product.tag}</span>}
        {!available && <span className={styles.soon}>Coming soon</span>}
      </div>
      <h3 className={styles.cardName}>{product.name}</h3>
      <div className={styles.chips}>
        {product.chips.map((chip) => (
          <span key={chip} className={styles.chip}>
            {chip}
          </span>
        ))}
      </div>
      {product.requires && <p className={styles.requires}>Requires {product.requires}</p>}
      <div className={styles.cardActions}>
        {available ? (
          <>
            <AppLink
              href={productHref(product)}
              className={`${styles.btn} ${styles.btnSm} ${styles.btnNavy}`}
              aria-label={`View ${product.name}`}
            >
              View
            </AppLink>
            <AppLink
              href={quoteHrefFor(product)}
              className={`${styles.btn} ${styles.btnSm} ${styles.btnOutline}`}
              aria-label={`Request a quote for ${product.name}`}
            >
              + Quote
            </AppLink>
          </>
        ) : (
          <AppLink href={interestHref(product.id)} className={`${styles.btn} ${styles.btnSm} ${styles.btnGold}`}>
            Register interest
          </AppLink>
        )}
      </div>
    </article>
  )
}
