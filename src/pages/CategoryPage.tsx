import { Navigate, useParams } from 'react-router'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Accent } from '@/components/ui/Accent/Accent'
import { Button } from '@/components/ui/Button/Button'
import { categories } from '@/data/categories.json'
import { products } from '@/data/products.json'
import { quoteHref } from '@/data/navigation'
import { Benefits } from '@/sections/category/Benefits/Benefits'
import { Procedures } from '@/sections/category/Procedures/Procedures'
import { Products } from '@/sections/category/Products/Products'

export function CategoryPage() {
  const { id } = useParams()
  const category = categories.find((c) => c.id === id)

  if (!category) return <Navigate to="/" replace />

  return (
    <>
      <title>{`${category.name} | HelioMed`}</title>
      <PageHero
        compact
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.name },
        ]}
        title={
          <>
            {category.hero.title} <Accent>{category.hero.titleAccent}</Accent>
          </>
        }
        lead={category.hero.lead}
        action={
          <>
            <Button href="#products" size="lg">
              View products
            </Button>
            <Button href={quoteHref} size="lg" variant="outlineInk">
              Request a quote
            </Button>
          </>
        }
      />
      <Procedures {...category.procedures} />
      <Products {...category.products} items={products.filter((p) => p.categoryId === category.id)} />
      <Benefits {...category.benefits} />
    </>
  )
}
