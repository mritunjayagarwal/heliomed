import { useSearchParams } from 'react-router'
import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Accent } from '@/components/ui/Accent/Accent'
import { categories, products, subcategoryName } from '@/data/catalog'
import { ContactCta } from '@/sections/home/ContactCta/ContactCta'
import { Filters } from '@/sections/products/Filters/Filters'
import { Listing } from '@/sections/products/Listing/Listing'

const PAGE_SIZE = 12

const categoryNames = new Map(categories.map((c) => [c.id, c.name]))

export function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? ''
  const query = params.get('q') ?? ''
  const sort = params.get('sort') ?? 'featured'
  const page = Math.max(1, Number(params.get('page')) || 1)

  // Any filter change resets to page 1; typing replaces the history entry instead of adding one per keystroke.
  const update = (key: string, value: string, replace = false) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        if (key !== 'page') next.delete('page')
        return next
      },
      { replace },
    )

  const needle = query.trim().toLowerCase()
  const matches = products
    .map((p) => ({ ...p, categoryName: categoryNames.get(p.categoryId) ?? '' }))
    .filter((p) => !category || p.categoryId === category)
    .filter(
      (p) => !needle || [p.name, p.code, subcategoryName(p.subcategoryId), p.description, p.categoryName].join(' ').toLowerCase().includes(needle),
    )
  if (sort !== 'featured') {
    matches.sort((a, b) => a.name.localeCompare(b.name) * (sort === 'name-desc' ? -1 : 1))
  }

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)

  return (
    <>
      <title>All products | HelioMed</title>
      <PageHero
        compact
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        title={
          <>
            All <Accent>products</Accent>
          </>
        }
        lead="The complete HelioMed range across endourology, continence care, surgical innovation and OT imaging."
        action={
          <Filters
            categories={categories.map((c) => ({
              id: c.id,
              name: c.name,
              count: products.filter((p) => p.categoryId === c.id).length,
            }))}
            total={products.length}
            category={category}
            query={query}
            sort={sort}
            onCategoryChange={(value) => update('category', value)}
            onQueryChange={(value) => update('q', value, true)}
            onSortChange={(value) => update('sort', value === 'featured' ? '' : value)}
          />
        }
      />
      <Listing
        items={matches.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)}
        total={matches.length}
        page={current}
        pageCount={pageCount}
        onPageChange={(n) => {
          update('page', n > 1 ? String(n) : '')
          document.getElementById('listing')?.scrollIntoView()
        }}
        onClear={() => setParams({})}
      />
      <ContactCta
        title="Can't find what you need? Ask our team."
        body="Tell us your specialty and the procedures you need to equip, and we'll recommend the right devices."
      />
    </>
  )
}
