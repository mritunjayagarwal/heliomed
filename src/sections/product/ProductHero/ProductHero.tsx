import { useState } from 'react'
import { images } from '@/assets/images'
import { CheckIcon, DownloadIcon } from '@/components/icons'
import { Accent } from '@/components/ui/Accent/Accent'
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb/Breadcrumb'
import { Button } from '@/components/ui/Button/Button'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder/ImagePlaceholder'
import { quoteHref } from '@/data/navigation'
import styles from './ProductHero.module.css'

interface ProductHeroProps {
  breadcrumb: Crumb[]
  eyebrow: string
  title: string
  titleAccent: string
  tagline: string
  keyBenefits: string[]
  sizes: string[]
  brochure: string | null
  image: { key: string | null; alt: string }
}

export function ProductHero({
  breadcrumb,
  eyebrow,
  title,
  titleAccent,
  tagline,
  keyBenefits,
  sizes,
  brochure,
  image,
}: ProductHeroProps) {
  const [size, setSize] = useState(sizes[0])
  const src = image.key ? images[image.key as keyof typeof images] : undefined

  return (
    <section className={styles.hero}>
      <div className="container">
        <Breadcrumb items={breadcrumb} />

        <div className={styles.grid}>
          <div className={styles.media}>
            {src ? <img src={src} alt={image.alt} /> : <ImagePlaceholder label={image.alt} />}
          </div>

          <div>
            <Eyebrow tone="gold" size="xs">
              {eyebrow}
            </Eyebrow>
            <h1 className={styles.title}>
              {title} <Accent>{titleAccent}</Accent>
            </h1>
            <p className={styles.tagline}>{tagline}</p>

            {keyBenefits.length > 0 && (
            <ul className={styles.benefits}>
              {keyBenefits.map((benefit) => (
                <li key={benefit}>
                  <CheckIcon width={16} height={16} className={styles.check} />
                  {benefit}
                </li>
              ))}
            </ul>
            )}

            {sizes.length > 0 && (
              <div className={styles.sizes}>
                <p id="sizes-label" className={styles.sizesLabel}>
                  Available sizes
                </p>
                <div role="group" aria-labelledby="sizes-label" className={styles.sizeOptions}>
                  {sizes.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={styles.size}
                      aria-pressed={option === size}
                      onClick={() => setSize(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.actions}>
              <Button href={quoteHref}>Request a quote</Button>
              {brochure && (
                <Button href={brochure} variant="outlineInk" download>
                  <DownloadIcon width={14} height={14} />
                  Download brochure
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
