import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import styles from './Button.module.css'

type Size = 'sm' | 'md' | 'lg'
type Variant = 'primary' | 'light' | 'outline' | 'outlineInk'

interface StyleProps {
  size?: Size
  variant?: Variant
}

type AsLink = AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & { href: string }
type AsButton = ButtonHTMLAttributes<HTMLButtonElement> & StyleProps & { href?: undefined }

export type ButtonProps = AsLink | AsButton

export function Button({ size = 'md', variant = 'primary', className, ...props }: ButtonProps) {
  const classes = [styles.button, styles[size], styles[variant], className].filter(Boolean).join(' ')

  if (props.href !== undefined) {
    return <AppLink className={classes} {...(props as AsLink)} />
  }
  return <button type="button" className={classes} {...(props as AsButton)} />
}
