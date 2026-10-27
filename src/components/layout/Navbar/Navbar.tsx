import { useEffect, useState, type FormEvent, type MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import { images } from '@/assets/images'
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { Button } from '@/components/ui/Button/Button'
import { SearchInput } from '@/components/ui/SearchInput/SearchInput'
import { navItems, quoteHref } from '@/data/navigation'
import { site } from '@/data/site'
import { NavDropdown } from './NavDropdown'
import styles from './Navbar.module.css'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenuOnLinkClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('a')) setMenuOpen(false)
  }

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const query = String(new FormData(form).get('q') ?? '').trim()
    navigate(query ? `/products?q=${encodeURIComponent(query)}` : '/products')
    form.reset()
    ;(document.activeElement as HTMLElement | null)?.blur()
    setMenuOpen(false)
  }

  return (
    <>
      <div className={styles.utility}>
        <div className={`container ${styles.utilityInner}`}>
          <ul className={styles.utilityContacts}>
            <li>
              <a href={`mailto:${site.email}`}>
                <MailIcon />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref}>
                <PhoneIcon />
                {site.phone}
              </a>
            </li>
          </ul>
          <p className={styles.parent}>A Dhyota Global company</p>
        </div>
      </div>

      <header className={styles.header} data-scrolled={scrolled}>
        <div className={`container ${styles.inner}`}>
          <AppLink href="/" className={styles.logo}>
            <img src={images.logo} alt={site.name} />
          </AppLink>

          <nav
            id="primary-menu"
            aria-label="Primary"
            className={styles.menu}
            data-open={menuOpen}
            onClick={closeMenuOnLinkClick}
          >
            <ul className={styles.links}>
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <NavDropdown label={item.label} items={item.children} />
                  ) : (
                    <AppLink href={item.href} className={styles.link}>
                      {item.label}
                    </AppLink>
                  )}
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <form role="search" className={styles.searchForm} onSubmit={submitSearch}>
                <SearchInput name="q" className={styles.search} />
              </form>
              <span className={styles.divider} aria-hidden="true" />
              <Button href={quoteHref} size="sm">
                Request a Quote
              </Button>
            </div>
          </nav>

          <button
            type="button"
            className={styles.toggle}
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
    </>
  )
}
