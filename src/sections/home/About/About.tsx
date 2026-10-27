import { images } from '@/assets/images'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { services } from '@/data/services'
import { ServiceCard } from './ServiceCard'
import styles from './About.module.css'

export function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <Eyebrow tone="gold" size="md">About HelioMed</Eyebrow>
          <h2 id="about-title" className={styles.title}>
            Devices built around real clinical demands.
          </h2>
          <p className={styles.lead}>
            HelioMed is Dhyota Global Healthcare Solutions' dedicated medical devices arm, formed to bring
            purpose-built endourology, continence care and OT imaging technology into Indian hospitals
          </p>

          <div id="products" className={styles.grid}>
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.media}>
        <img src={images.aboutImage} alt="Technician assembling catheter components" loading="lazy" />
      </div>
    </section>
  )
}
