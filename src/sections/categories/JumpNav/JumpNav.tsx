import { useEffect, useState } from 'react'
import styles from './JumpNav.module.css'

interface JumpNavProps {
  items: { id: string; name: string }[]
}

// Links to each category block; the one whose block crosses the middle of the viewport is marked current.
export function JumpNav({ items }: JumpNavProps) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label="Categories" className={styles.nav}>
      {items.map((item, i) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={styles.link}
          aria-current={item.id === active ? 'location' : undefined}
        >
          <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
          {item.name}
        </a>
      ))}
    </nav>
  )
}
