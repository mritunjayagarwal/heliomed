import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { quoteHref } from '@/data/navigation'
import styles from './ContactCta.module.css'

interface ContactCtaProps {
  title?: ReactNode
  body?: string
}

export function ContactCta({
  title = (
    <>
      Bring HelioMed
      <br />
      into your OT.
    </>
  ),
  body = 'Tell us which specialty you practice and which procedures you need to equip.',
}: ContactCtaProps) {
  return (
    <section className={styles.contact} aria-labelledby="contact-title">
      <span className={styles.circle} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <Eyebrow tone="gold" size="md">
          Get in touch
        </Eyebrow>
        <h2 id="contact-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.body}>{body}</p>
        <div className={styles.actions}>
          <Button href={quoteHref} variant="light">
            Request a Quote
          </Button>
          <Button href="/contact" variant="outline">
            Contact our Team
          </Button>
        </div>
      </div>
    </section>
  )
}
