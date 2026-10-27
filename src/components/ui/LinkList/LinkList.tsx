import { ArrowRightIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import styles from './LinkList.module.css'

interface LinkListProps {
  items: { label: string; href: string }[]
  tone?: 'light' | 'dark'
  className?: string
}

export function LinkList({ items, tone = 'light', className }: LinkListProps) {
  return (
    <ul className={[styles.list, styles[tone], className].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <li key={item.label}>
          <AppLink href={item.href} className={styles.item}>
            {item.label}
            <ArrowRightIcon className={styles.arrow} />
          </AppLink>
        </li>
      ))}
    </ul>
  )
}
