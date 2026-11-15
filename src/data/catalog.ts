// Typed access to the catalogue. products.json is the single flat list of every product;
// categories.json holds each category's copy, subcategories and procedures.
import { images } from '@/assets/images'
import { categories } from './categories.json'
import { products as rawProducts } from './products.json'

export type ProductStatus = 'available' | 'coming-soon'

export interface SpecRow {
  label: string
  value: string
  highlight?: boolean
}

export interface Product {
  id: string
  code: string | null
  name: string
  description: string
  /** Primary home. The product page lives at /products/:categoryId/:id. */
  categoryId: string
  subcategoryId: string
  /** Other categories that also list this product (e.g. processors on Endourology). */
  alsoIn: string[]
  status: ProductStatus
  /** Procedure ids, matching a category's procedures.items[].id. */
  procedures: string[]
  tag: string | null
  variantLabel: string | null
  chips: string[]
  requires: string | null
  /** Default ("featured") sort position. */
  order: number
  image: { key: string | null; alt: string }
  title: string
  titleAccent: string
  tagline: string
  keyBenefits: string[]
  sizes: string[]
  brochure: string | null
  overview: {
    eyebrow: string
    title: string
    paragraphs: string[]
    image: { key: string | null; alt: string }
  } | null
  specs: { eyebrow: string; title: string; note: string; rows: SpecRow[] } | null
  variants: { code: string; size: string; length: string; pack: string }[]
}

export type Category = (typeof categories)[number]
export type Subcategory = Category['subcategories'][number]

export const products = (rawProducts as Product[]).toSorted((a, b) => a.order - b.order)
export { categories }

const subcategories = categories.flatMap((c) => c.subcategories)

export const getCategory = (id: string | undefined) => categories.find((c) => c.id === id)
export const getSubcategory = (id: string) => subcategories.find((s) => s.id === id)
export const subcategoryName = (id: string) => getSubcategory(id)?.name ?? ''

/** Products whose primary home is the category, plus those cross-listed into it. */
export const productsInCategory = (categoryId: string) =>
  products.filter((p) => p.categoryId === categoryId || p.alsoIn.includes(categoryId))

export const productsInSubcategory = (subcategoryId: string) =>
  products.filter((p) => p.subcategoryId === subcategoryId)

/** Resolved image URL, or undefined while the product still has no image. */
export const productImage = (p: Product) => 
  p.image.key ? (images as Record<string, string>)[p.image.key] : undefined

export const isAvailable = (p: Product) => p.status === 'available'

export const productHref = (p: Product) => `/products/${p.categoryId}/${p.id}`

/** "RP-U-C04 · Flexible ureteroscope · 6.3 Fr" — the text used in dropdowns. */
export const productLabel = (p: Product) => (p.code ? `${p.code} · ${p.name}` : p.name)

/** Contact-form links that carry the product (or subcategory) the visitor asked about. */
export const quoteHrefFor = (p: Product) => `/contact?product=${p.id}#quote`
export const interestHref = (id: string) => `/contact?interest=${id}#quote`
