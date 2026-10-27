import { services } from './services'

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'All products', href: '/products' },
      { label: 'All categories', href: '/categories' },
      ...services.map(({ title, href }) => ({ label: title, href })),
    ],
  },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
]

export const quoteHref = '/contact#quote'

export const footerLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Request a Quote', href: quoteHref },
]

export const legalLinks: NavItem[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
]
