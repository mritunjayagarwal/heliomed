import { images } from '@/assets/images'
import { ArrowRightIcon, CheckIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { Button } from '@/components/ui/Button/Button'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder/ImagePlaceholder'
import styles from './CategoryBlock.module.css'

interface CategoryBlockProps {
  id: string
  index: number
  name: string
  description: string
  highlights: string[]
  image: { key: string | null; alt: string }
  featured: { name: string; href: string }[]
}

// Even blocks are navy with the image on the right; odd blocks are cream with the image on the left.
export function CategoryBlock({ id, index, name, description, highlights, image, featured }: CategoryBlockProps) {
  const tone = index % 2 === 0 ? 'dark' : 'light'
  const src = image.key ? images[image.key as keyof typeof images] : undefined

  return (
    <section id={id} className={styles[tone]} aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
          <h2 id={`${id}-title`} className={styles.title}>
            {name}
          </h2>
          <p className={styles.description}>{description}</p>

          <ul className={styles.highlights}>
            {highlights.map((highlight) => (
              <li key={highlight}>
                <CheckIcon width={16} height={16} className={styles.check} />
                {highlight}
              </li>
            ))}
          </ul>

          <div className={styles.featured}>
            <p className={styles.featuredLabel}>Featured products</p>
            <ul className={styles.products}>
              {featured.map((product) => (
                <li key={product.href}>
                  <AppLink href={product.href} className={styles.product}>
                    {product.name}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>

          <Button href={`/products/${id}`} variant={tone === 'dark' ? 'light' : 'primary'} className={styles.cta}>
            Explore category
            <ArrowRightIcon width={14} height={14} />
          </Button>
        </div>

        <div className={styles.media}>
          {src ? (
            <img src={src} alt={image.alt} loading="lazy" />
          ) : (
            <ImagePlaceholder label={image.alt} tone={tone} striped />
          )}
        </div>
      </div>
    </section>
  )
}
