import { images } from '@/assets/images'
import { LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/icons'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { footerLinks, legalLinks } from '@/data/navigation'
import { services } from '@/data/services'
import { site } from '@/data/site'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <AppLink href="/" className={styles.logo}>
              <img src={images.logo} alt={site.name} />
            </AppLink>
            <p className={styles.tagline}>{site.tagline}</p>
            <p className={styles.parent}>A Dhyota Global company</p>
            <ul className={styles.socials}>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className={styles.social} aria-label={social.label}>
                    <LinkedInIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-products">
            <Eyebrow size="xs">
              <span id="footer-products">Products</span>
            </Eyebrow>
            <ul className={styles.links}>
              {services.map((service) => (
                <li key={service.id}>
                  <AppLink href={service.href} className={styles.link}>
                    {service.title}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <Eyebrow size="xs">
              <span id="footer-company">Company</span>
            </Eyebrow>
            <ul className={styles.links}>
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <AppLink href={link.href} className={styles.link}>
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Eyebrow size="xs">
              Contact
            </Eyebrow>
            <ul className={styles.links}>
              <li>
                <a href={`mailto:${site.email}`} className={`${styles.link} ${styles.contactItem}`}>
                  <MailIcon className={styles.icon} />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className={`${styles.link} ${styles.contactItem}`}>
                  <PhoneIcon className={styles.icon} />
                  {site.phone}
                </a>
              </li>
              <li className={styles.contactItem}>
                <MapPinIcon className={styles.icon} />
                <address className={styles.address}>
                  {site.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. A division of {site.legalName}
          </p>
          <ul className={styles.legal}>
            {legalLinks.map((link) => (
              <li key={link.label}>
                <AppLink href={link.href} className={styles.link}>
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
