import { Accent } from '@/components/ui/Accent/Accent'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { LinkList } from '@/components/ui/LinkList/LinkList'
import { rangeItems } from '@/data/range'
import { QuoteForm } from '@/sections/contact/QuoteForm/QuoteForm'
import styles from './Enquiry.module.css'

export function Enquiry() {
  return (
    <section className={styles.enquiry} aria-labelledby="enquiry-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <Eyebrow tone="gold" size="xs">
            Get in touch
          </Eyebrow>
          <h2 id="enquiry-title" className={styles.title}>
            Tell us what your theatre <Accent>needs.</Accent>
          </h2>
          <p className={styles.body}>
            Choose the devices you are interested in and add a few lines on your procedures. The clearer the brief,
            the more specific our reply.
          </p>
          <LinkList items={rangeItems} tone="dark" className={styles.list} />
        </div>

        <QuoteForm />
      </div>
    </section>
  )
}
