import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

// Scrolls to the #hash target after navigation (e.g. "/#about" from another page),
// otherwise back to the top on page change. Query-only changes (product filters) keep the position.
export function ScrollManager() {
  const { pathname, search, hash, key } = useLocation()
  const previous = useRef({ pathname, search })

  useEffect(() => {
    const queryOnly = previous.current.pathname === pathname && previous.current.search !== search
    previous.current = { pathname, search }
    if (queryOnly) return

    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, search, hash, key])

  return null
}
