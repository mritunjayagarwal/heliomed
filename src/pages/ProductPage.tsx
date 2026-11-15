import { Navigate, useParams } from 'react-router'
import { categories, products, subcategoryName } from '@/data/catalog'
import { ContactCta } from '@/sections/home/ContactCta/ContactCta'
import { Ordering } from '@/sections/product/Ordering/Ordering'
import { Overview } from '@/sections/product/Overview/Overview'
import { ProductHero } from '@/sections/product/ProductHero/ProductHero'
import { Specifications } from '@/sections/product/Specifications/Specifications'

export function ProductPage() {
  const { categoryId, productId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const product = products.find((p) => p.id === productId && p.categoryId === categoryId)

  if (!category) return <Navigate to="/" replace />
  if (!product) return <Navigate to={`/products/${category.id}`} replace />

  return (
    <>
      <title>{`${product.name} | HelioMed`}</title>
      <ProductHero
        key={product.id}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.name, href: `/products/${category.id}` },
          { label: product.name },
        ]}
        eyebrow={`${category.name} · ${subcategoryName(product.subcategoryId)}`}
        title={product.title}
        titleAccent={product.titleAccent}
        tagline={product.tagline}
        keyBenefits={product.keyBenefits}
        sizes={product.sizes}
        brochure={product.brochure}
        image={product.image}
      />
      {product.overview && <Overview {...product.overview} />}
      {product.specs && <Specifications {...product.specs} />}
      {product.variants.length > 0 && <Ordering variants={product.variants} />}
      <ContactCta
        title={`Interested in the ${`${product.title} ${product.titleAccent}`.trim()}?`}
        body="Request pricing, samples or a demonstration, and our team will come back to you."
      />
    </>
  )
}
