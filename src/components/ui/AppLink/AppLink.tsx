import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router'

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

// Routes in-app paths ("/", "/contact", "/#about") through the router; everything else
// (mailto:, tel:, external URLs) renders a plain anchor.
export function AppLink({ href, ...props }: AppLinkProps) {
  if (href.startsWith('/')) return <Link to={href} {...props} />
  return <a href={href} {...props} />
}
