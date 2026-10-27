import { images } from '@/assets/images'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { LinkList } from '@/components/ui/LinkList/LinkList'
import { rangeItems } from '@/data/range'
import styles from './Range.module.css'

export function Range() {
  return (
    <section className={styles.range} aria-labelledby="range-title">
      <div className={styles.media}>
        <img src={images.rangeImage} alt="Clinician in protective gear reviewing digital medical data" loading="lazy" />
      </div>

      <div className={styles.content}>
        <Eyebrow size="xs">
          <span id="range-title">What's in the range</span>
        </Eyebrow>
        <LinkList items={rangeItems} className={styles.list} />
      </div>
    </section>
  )
}
