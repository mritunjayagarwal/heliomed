import { AppLink } from '@/components/ui/AppLink/AppLink'
import styles from './Breadcrumb.module.css'

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={styles.breadcrumb}>
        {items.map((crumb, i) => (
          <li key={crumb.label}>
            {i === items.length - 1 ? (
              <span aria-current="page">{crumb.label}</span>
            ) : (
              <AppLink href={crumb.href ?? '/'}>{crumb.label}</AppLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
