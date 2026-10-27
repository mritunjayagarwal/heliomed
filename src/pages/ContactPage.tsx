import { PageHero } from '@/components/layout/PageHero/PageHero'
import { Accent } from '@/components/ui/Accent/Accent'
import { Enquiry } from '@/sections/contact/Enquiry/Enquiry'

export function ContactPage() {
  return (
    <>
      <title>Contact | HelioMed</title>
      <PageHero
        compact
        eyebrow="HelioMed · Contact Us"
        title={
          <>
            Bring HelioMed{' '}
            <br />
            into your <Accent>OT.</Accent>
          </>
        }
        lead="Tell us which specialty you practice and which procedures you need to equip. Our team will come back with the right devices and a quote."
      />
      <Enquiry />
    </>
  )
}
