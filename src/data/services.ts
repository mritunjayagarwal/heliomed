export interface Service {
  id: string
  title: string
  description: string
  href: string
}

export const services: Service[] = [
  {
    id: 'endourology',
    title: 'Endourology & PCNL',
    description:
      'Single-use flexible ureteroscopes, cystoscopes and nephroscopes for RIRS, PCNL and cystoscopy, with the video processors that run them.',
    href: '/products/endourology',
  },
  {
    id: 'continence-care',
    title: 'Continence Care',
    description:
      'The ConviCath® hydrophilic intermittent catheter range, across male, female and Tiemann tip configurations.',
    href: '/products/continence-care',
  },
  {
    id: 'surgical-innovation',
    title: 'Surgical Innovation',
    description:
      'CLIP D, a disposable circumcision stapling device designed to standardise a routine procedure.',
    href: '/products/surgical-innovation',
  },
  {
    id: 'ot-imaging',
    title: 'OT Imaging',
    description:
      'Venus 3D navigation and image-fusion ultrasound, built for real-time guidance inside the operating theatre.',
    href: '/products/ot-imaging',
  },
]
