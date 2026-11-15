import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Accent } from '@/components/ui/Accent/Accent'
import { categories, products } from '@/data/catalog'
import { CategoryBlock } from '@/sections/categories/CategoryBlock/CategoryBlock'
import { JumpNav } from '@/sections/categories/JumpNav/JumpNav'
import { ContactCta } from '@/sections/home/ContactCta/ContactCta'

const jumpItems = categories.map(({ id, name }) => ({ id, name }))

export function CategoriesPage() {
  return (
    <>
      <title>Categories | HelioMed</title>
      <PageHero
        compact
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Categories' },
        ]}
        title={
          <>
            Four areas of <Accent>clinical care</Accent>
          </>
        }
        lead="HelioMed's four product categories, from stone access in the operating theatre to continence care at home."
        action={<JumpNav items={jumpItems} />}
      />
      {categories.map((category, i) => (
        <CategoryBlock
          key={category.id}
          id={category.id}
          index={i}
          name={category.name}
          {...category.overview}
          featured={products
            .filter((p) => p.categoryId === category.id)
            .slice(0, 3)
            .map((p) => ({ name: p.name, href: `/products/${p.categoryId}/${p.id}` }))}
        />
      ))}
      <ContactCta
        title="Not sure which category fits? Talk to us."
        body="Tell us your specialty and the procedures you need to equip, and we'll point you to the right devices."
      />
    </>
  )
}
