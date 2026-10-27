import { images } from '@/assets/images'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder/ImagePlaceholder'
import { LinkList } from '@/components/ui/LinkList/LinkList'
import styles from './Procedures.module.css'

interface ProceduresProps {
  eyebrow: string
  title: string
  image: { key: string | null; alt: string }
  items: { label: string; href: string }[]
}

export function Procedures({ eyebrow, title, image, items }: ProceduresProps) {
  // image.key names an entry in the images map; null until the real asset is added.
  const src = image.key ? images[image.key as keyof typeof images] : undefined

  return (
    <section className={styles.procedures} aria-labelledby="procedures-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.media}>
          {src ? (
            <img src={src} alt={image.alt} loading="lazy" />
          ) : (
            <ImagePlaceholder label={image.alt} striped />
          )}
        </div>

        <div className={styles.content}>
          <Eyebrow size="xs" className={styles.eyebrow}>
            {eyebrow}
          </Eyebrow>
          <h2 id="procedures-title" className={styles.title}>
            {title}
          </h2>
          <LinkList items={items} tone="dark" className={styles.list} />
        </div>
      </div>
    </section>
  )
}
