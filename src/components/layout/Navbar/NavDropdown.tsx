import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import type { NavItem } from '@/data/navigation'
import styles from './NavDropdown.module.css'

interface NavDropdownProps {
  label: string
  items: NonNullable<NavItem['children']>
}

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDownIcon className={styles.chevron} data-open={open} />
      </button>

      <ul id={menuId} className={styles.menu} data-open={open}>
        {items.map((item) => (
          <li key={item.href}>
            <AppLink href={item.href} className={styles.item} onClick={() => setOpen(false)}>
              {item.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
