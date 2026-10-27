import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Accent } from '@/components/ui/Accent/Accent'
import { Button } from '@/components/ui/Button/Button'
import { About } from '@/sections/home/About/About'
import { ContactCta } from '@/sections/home/ContactCta/ContactCta'
import { Group } from '@/sections/home/Group/Group'
import { Range } from '@/sections/home/Range/Range'

export function HomePage() {
  return (
    <>
      <title>HelioMed | Medical Devices</title>
      <PageHero
        eyebrow="HelioMed · Medical Devices"
        title={
          <>
            Precision devices for{' '}
            <br />
            modern <Accent>urology</Accent>
          </>
        }
        action={
          <Button href="/#about" size="lg">
            Explore our solutions
          </Button>
        }
      />
      <About />
      <Range />
      <Group />
      <ContactCta />
    </>
  )
}
