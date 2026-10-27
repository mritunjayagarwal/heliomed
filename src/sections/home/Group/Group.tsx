import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { groupAreas } from '@/data/group'
import styles from './Group.module.css'

export function Group() {
  return (
    <section className={styles.group} aria-labelledby="group-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Eyebrow tone="gold" size="md">
            Part of Dhyota Global
          </Eyebrow>
          <h2 id="group-title" className={styles.title}>
            One healthcare group,{' '}
            <br />
            spanning medicine and devices.
          </h2>
          <p className={styles.body}>
            Dhyota Global Healthcare Solutions Pvt. Ltd. is a Hyderabad-based healthcare company spanning men's
            health and urology pharmaceuticals, pharma manufacturing, and — through HelioMed — medical devices. The
            same clinical and regulatory teams that support Dhyota's product strategy stand behind HelioMed's device
            portfolio.
          </p>
        </div>

        <aside className={styles.card} aria-labelledby="glance-title">
          <Eyebrow tone="gold" size="xs">
            Dhyota Global at a glance
          </Eyebrow>
          <h3 id="glance-title" className={styles.cardTitle}>
            Four areas, one purpose.
          </h3>
          <dl className={styles.areas}>
            {groupAreas.map((area) => (
              <div key={area.title} className={styles.area}>
                <dt className={styles.areaTitle}>{area.title}</dt>
                <dd className={styles.areaText}>{area.description}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  )
}
