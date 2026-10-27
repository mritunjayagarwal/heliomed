import { site } from '@/data/site'

export interface Enquiry {
  name: string
  organisation: string
  email: string
  phone: string
  city: string
  specialty: string
  devices: string[]
  procedures: string
}

export function buildEnquiryMailto(enquiry: Enquiry): string {
  const subject = `Quote request: ${enquiry.organisation}`
  const body = [
    `Name: ${enquiry.name}`,
    `Hospital / Organisation: ${enquiry.organisation}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || 'Not provided'}`,
    `City: ${enquiry.city || 'Not provided'}`,
    `Specialty: ${enquiry.specialty}`,
    `Devices of interest: ${enquiry.devices.length ? enquiry.devices.join(', ') : 'Not specified'}`,
    '',
    'Procedures to equip:',
    enquiry.procedures,
  ].join('\n')

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// Hands the enquiry to the visitor's email app. Swap this for an API call once a backend exists.
export function sendEnquiry(enquiry: Enquiry) {
  window.location.href = buildEnquiryMailto(enquiry)
}
