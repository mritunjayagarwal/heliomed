import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { ChipGroup } from '@/components/ui/form/ChipGroup'
import { TextArea } from '@/components/ui/form/TextArea'
import { TextField } from '@/components/ui/form/TextField'
import { deviceOptions } from '@/data/quoteForm'
import { site } from '@/data/site'
import { sendEnquiry, type Enquiry } from '@/services/enquiry'
import styles from './QuoteForm.module.css'

type Errors = Partial<Record<keyof Enquiry, string>>

const initialValues: Enquiry = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  city: '',
  specialty: '',
  devices: [],
  procedures: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: Enquiry): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.organisation.trim()) errors.organisation = 'Please enter your hospital or organisation.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.specialty.trim()) errors.specialty = 'Please enter your specialty.'
  if (!values.procedures.trim()) errors.procedures = 'Please describe the procedures you need to equip.'
  return errors
}

export function QuoteForm() {
  const [values, setValues] = useState<Enquiry>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const update =
    (field: Exclude<keyof Enquiry, 'devices'>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }))
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }

    sendEnquiry(values)
    setSent(true)
  }

  return (
    <div id="quote" className={styles.card}>
      <h2 className={styles.heading}>Request a quote</h2>
      <p className={styles.note}>
        Fields marked <span className={styles.star}>*</span> are required.
      </p>

      <form ref={formRef} className={styles.grid} onSubmit={handleSubmit} noValidate>
        <TextField label="Full name" name="name" autoComplete="name" required value={values.name} onChange={update('name')} error={errors.name} />
        <TextField
          label="Hospital / Organisation"
          name="organisation"
          autoComplete="organization"
          required
          value={values.organisation}
          onChange={update('organisation')}
          error={errors.organisation}
        />
        <TextField label="Email" name="email" type="email" autoComplete="email" required value={values.email} onChange={update('email')} error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update('phone')} />
        <TextField label="City" name="city" autoComplete="address-level2" value={values.city} onChange={update('city')} />
        <TextField label="Your specialty" name="specialty" required value={values.specialty} onChange={update('specialty')} error={errors.specialty} />

        <ChipGroup
          className={styles.full}
          label="Devices of interest"
          options={deviceOptions}
          value={values.devices}
          onChange={(devices) => setValues((v) => ({ ...v, devices }))}
        />

        <TextArea
          className={styles.full}
          label="Procedures you need to equip"
          name="procedures"
          required
          value={values.procedures}
          onChange={update('procedures')}
          error={errors.procedures}
        />

        <div className={`${styles.full} ${styles.footer}`}>
          <p className={styles.privacy}>We use your details only to reply to this enquiry.</p>
          <Button type="submit">Send enquiry</Button>
        </div>

        {sent && (
          <p className={`${styles.full} ${styles.status}`} role="status">
            Your email app should now be open with your enquiry ready to send. If nothing opened, email us at{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </form>
    </div>
  )
}
