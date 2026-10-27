import { ArrowRightIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import type { Service } from '@/data/services'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
  service: Service
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article id={service.id} className={styles.card}>
      <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
      <h3 className={styles.title}>
        <AppLink href={service.href} className={styles.link}>
          {service.title}
          <ArrowRightIcon className={styles.arrow} />
        </AppLink>
      </h3>
      <p className={styles.description}>{service.description}</p>
    </article>
  )
}
