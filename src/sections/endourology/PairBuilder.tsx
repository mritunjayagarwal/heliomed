import { useState } from 'react'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import { productLabel, type Product } from '@/data/catalog'
import { DeviceImage } from './DeviceCard'
import styles from './Endourology.module.css'

interface PairBuilderProps {
  scopes: Product[]
  processors: Product[]
}

export function PairBuilder({ scopes, processors }: PairBuilderProps) {
  const [scope, setScope] = useState((scopes.find((p) => p.tag === 'Workhorse') ?? scopes[0])?.id)
  const [processor, setProcessor] = useState(processors[0]?.id)

  const steps = [
    { name: 'Choose your scope', options: scopes, value: scope, onChange: setScope },
    { name: 'Choose your processor', options: processors, value: processor, onChange: setProcessor },
  ]

  return (
    <section id="pair" className={styles.pair} aria-labelledby="pair-title">
      <div className={`${styles.wrap} ${styles.pairInner}`}>
        <p className={styles.eyebrow}>One quote, one supplier</p>
        <h2 id="pair-title" className={styles.h2}>
          Pair your scope with a processor
        </h2>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.name} className={styles.step}>
              <span className={styles.stepNo}>STEP {i + 1}</span>
              <DeviceImage product={step.options.find((p) => p.id === step.value)} height={90} dark />
              <p className={styles.stepName}>{step.name}</p>
              <label className={styles.stepLabel}>
                Choose
                <select className={styles.select} value={step.value} onChange={(e) => step.onChange(e.target.value)}>
                  {step.options.map((p) => (
                    <option key={p.id} value={p.id}>
                      {productLabel(p)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </div>
        <div>
          <AppLink
            href={`/contact?scope=${scope}&processor=${processor}#quote`}
            className={`${styles.btn} ${styles.btnCream}`}
          >
            Request quote for this pair
          </AppLink>
        </div>
      </div>
    </section>
  )
}
