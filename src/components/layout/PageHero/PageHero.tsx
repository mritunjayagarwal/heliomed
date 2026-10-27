import type { ReactNode } from 'react'
import { images } from '@/assets/images'
import { Breadcrumb, type Crumb } from '@/components/ui/Breadcrumb/Breadcrumb'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import styles from './PageHero.module.css'

interface PageHeroProps {
  eyebrow?: string
  breadcrumb?: Crumb[]
  title: ReactNode
  lead?: string
  action?: ReactNode
  compact?: boolean
}

export function PageHero({ eyebrow, breadcrumb, title, lead, action, compact = false }: PageHeroProps) {
  return (
    <section
      className={[styles.hero, compact && styles.compact].filter(Boolean).join(' ')}
      style={{ backgroundImage: `url(${images.heroBg})` }}
    >
      <div className={`container ${styles.inner}`}>
        {breadcrumb ? (
          <Breadcrumb items={breadcrumb} />
        ) : (
          eyebrow && <Eyebrow>{eyebrow}</Eyebrow>
        )}
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </section>
  )
}
