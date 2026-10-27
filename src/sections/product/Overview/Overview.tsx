import { images } from '@/assets/images'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder/ImagePlaceholder'
import styles from './Overview.module.css'

interface OverviewProps {
  eyebrow: string
  title: string
  paragraphs: string[]
  image: { key: string | null; alt: string }
}

export function Overview({ eyebrow, title, paragraphs, image }: OverviewProps) {
  const src = image.key ? images[image.key as keyof typeof images] : undefined

  return (
    <section className={styles.overview} aria-labelledby="overview-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <Eyebrow tone="gold" size="xs">
            {eyebrow}
          </Eyebrow>
          <h2 id="overview-title" className={styles.title}>
            {title}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.media}>
          {src ? (
            <img src={src} alt={image.alt} loading="lazy" />
          ) : (
            <ImagePlaceholder label={image.alt} tone="dark" striped />
          )}
        </div>
      </div>
    </section>
  )
}
