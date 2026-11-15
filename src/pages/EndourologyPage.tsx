import { useState } from 'react'
import { AppLink } from '@/components/ui/AppLink/AppLink'
import {
  getCategory,
  getSubcategory,
  interestHref,
  isAvailable,
  productHref,
  productsInCategory,
  type Product,
} from '@/data/catalog'
import { quoteHref } from '@/data/navigation'
import { CompareTable } from '@/sections/endourology/CompareTable'
import { DeviceCard, DeviceImage } from '@/sections/endourology/DeviceCard'
import styles from '@/sections/endourology/Endourology.module.css'
import { PairBuilder } from '@/sections/endourology/PairBuilder'

const category = getCategory('endourology')!
const all = productsInCategory(category.id)
const inSub = (id: string) => all.filter((p) => p.subcategoryId === id)

// Subcategories in the order their products appear, including cross-listed ones (video processors).
const subs = [...new Set(all.map((p) => p.subcategoryId))].map((id) => getSubcategory(id)!)
const [ureteroscopes, cysto, accessories, processors] = subs
const comingSoon = all.filter((p) => !isAvailable(p))

export function EndourologyPage() {
  const [procedure, setProcedure] = useState('')
  const [soonOnly, setSoonOnly] = useState(false)

  const dim = (p: Product) => (procedure !== '' && !p.procedures.includes(procedure)) || (soonOnly && isAvailable(p))

  const head = (sub: (typeof subs)[number], soon = false) => (
    <div>
      <div className={styles.eyebrowRow}>
        <p className={styles.eyebrow}>{sub.eyebrow}</p>
        {soon && <span className={styles.soon}>Coming soon</span>}
      </div>
      <h2 className={styles.h2}>{sub.title}</h2>
      <p className={styles.lead}>{sub.description}</p>
    </div>
  )

  return (
    <div className={styles.page}>
      <title>{`${category.name} | HelioMed`}</title>

      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <nav aria-label="Breadcrumb" className={styles.crumbs}>
              <AppLink href="/">Home</AppLink>
              <span aria-hidden="true">›</span>
              <AppLink href="/products">Products</AppLink>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{category.name}</span>
            </nav>
            <p className={styles.eyebrow}>{category.name}</p>
            <h1 className={styles.heroTitle}>{category.hero.headline}</h1>
            <p className={styles.heroLead}>{category.hero.lead}</p>
            <div className={styles.heroActions}>
              <a href="#products" className={`${styles.btn} ${styles.btnCream}`}>
                View products
              </a>
              <AppLink href={quoteHref} className={`${styles.btn} ${styles.btnOutlineLight}`}>
                Book an OT demo
              </AppLink>
            </div>
          </div>
          <div className={`${styles.ph} ${styles.heroMedia}`}>Hero image · scope in OT</div>
        </div>
      </section>

      <div className={styles.bar}>
        <nav className={`${styles.wrap} ${styles.barInner}`} aria-label="Device types">
          <a href="#products" className={`${styles.tab} ${styles.tabAll}`}>
            All · {all.length}
          </a>
          {subs.map((sub) => (
            <a key={sub.id} href={`#${sub.id}`} className={styles.tab}>
              {sub.shortName} · {inSub(sub.id).length}
            </a>
          ))}
          <button
            type="button"
            className={`${styles.tab} ${styles.tabSoon}`}
            aria-pressed={soonOnly}
            onClick={() => setSoonOnly(!soonOnly)}
          >
            Coming soon · {comingSoon.length}
          </button>
          <span className={styles.spacer} />
          <label className={styles.procedure}>
            Procedure
            <select className={styles.select} value={procedure} onChange={(e) => setProcedure(e.target.value)}>
              <option value="">All procedures</option>
              {category.procedures.items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </nav>
      </div>

      <section id="products" className={`${styles.wrap} ${styles.section}`} style={{ paddingBlock: '48px 24px' }}>
        <div className={styles.sectHead}>
          <h2 className={styles.h2}>Browse by device type</h2>
        </div>
        <div className={`${styles.grid} ${styles.cols4}`}>
          {subs.map((sub) => (
            <a key={sub.id} href={`#${sub.id}`} className={`${styles.card} ${styles.cardRow}`}>
              <DeviceImage product={inSub(sub.id)[0]} width={96} height={80} />
              <div>
                <p className={styles.tileTitle}>{sub.name}</p>
                <p className={styles.tileDesc}>{sub.summary}</p>
                <span className={styles.arrowLink} aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id={ureteroscopes.id} className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.sectHead}>
          {head(ureteroscopes)}
          <a href="#compare" className={styles.textLink}>
            Compare all {inSub(ureteroscopes.id).length} models ↓
          </a>
        </div>
        <div className={`${styles.grid} ${styles.cols4}`}>
          {inSub(ureteroscopes.id).map((p) => (
            <DeviceCard key={p.id} product={p} dim={dim(p)} />
          ))}
        </div>
      </section>

      <CompareTable title="Compare ureteroscopes" products={inSub(ureteroscopes.id)} />

      <section id={cysto.id} className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.sectHead}>{head(cysto)}</div>
        <div className={`${styles.grid} ${styles.cols5}`}>
          {inSub(cysto.id).map((p) => (
            <DeviceCard key={p.id} product={p} dim={dim(p)} compact />
          ))}
        </div>
      </section>

      <section id={accessories.id} className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.sectHead}>{head(accessories, inSub(accessories.id).every((p) => !isAvailable(p)))}</div>
        <div className={`${styles.grid} ${styles.cols4}`}>
          {inSub(accessories.id).map((p) => (
            <DeviceCard key={p.id} product={p} dim={dim(p)} compact />
          ))}
          <div className={styles.callout}>
            <p className={styles.tileTitle}>Planning a cystoscopy or biopsy set?</p>
            <p className={styles.lead} style={{ fontSize: 14 }}>
              Tell us your monthly volume and we'll prioritise your order when these arrive.
            </p>
            <AppLink href={interestHref(accessories.id)} className={`${styles.btn} ${styles.btnNavy}`}>
              Register interest
            </AppLink>
          </div>
        </div>
      </section>

      <section id={processors.id} className={`${styles.wrap} ${styles.section}`}>
        <div className={styles.processors}>
          <div className={styles.sectHead}>
            {head(processors)}
            <AppLink href="/products/ot-imaging" className={styles.textLink}>
              See in OT Imaging →
            </AppLink>
          </div>
          <div className={`${styles.grid} ${styles.cols3}`}>
            {inSub(processors.id).map((p) => (
              <article key={p.id} className={`${styles.card} ${styles.cardRow}`} data-dim={dim(p)}>
                <DeviceImage product={p} width={110} height={90} />
                <div>
                  <div className={styles.cardMeta} style={{ justifyContent: 'flex-start' }}>
                    <span className={styles.code}>{p.code}</span>
                    {!isAvailable(p) && <span className={styles.soon}>Coming soon</span>}
                  </div>
                  <h3 className={styles.cardName} style={{ fontSize: 15 }}>
                    {isAvailable(p) ? <AppLink href={productHref(p)}>{p.name}</AppLink> : p.name}
                  </h3>
                  <div className={styles.chips}>
                    {p.chips.map((chip) => (
                      <span key={chip} className={styles.chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                  {!isAvailable(p) && (
                    <AppLink href={interestHref(p.id)} className={`${styles.arrowLink} ${styles.textLink}`}>
                      Register interest →
                    </AppLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PairBuilder
        scopes={all.filter((p) => p.requires && isAvailable(p))}
        processors={inSub(processors.id).filter(isAvailable)}
      />

      <section className={`${styles.wrap} ${styles.procedures}`}>
        <p className={styles.eyebrow}>{category.procedures.eyebrow}</p>
        <h2 className={styles.h2}>{category.procedures.title}</h2>
        <div className={`${styles.grid} ${styles.cols3}`}>
          {category.procedures.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.card} ${styles.procCard}`}
              aria-pressed={procedure === item.id}
              onClick={() => {
                setProcedure(procedure === item.id ? '' : item.id)
                document.getElementById('products')?.scrollIntoView()
              }}
            >
              <span className={styles.procName}>{item.label}</span>
              <span className={styles.tileDesc}>{item.uses}</span>
              <span className={styles.arrowLink}>Show devices →</span>
            </button>
          ))}
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.why}`} aria-label="Why HelioMed">
        <dl className={styles.whyGrid}>
          {category.benefits.items.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.cta}>
        <div className={`${styles.wrap} ${styles.ctaInner}`}>
          <div>
            <h2 className={styles.ctaTitle}>See a scope in your own OT.</h2>
            <p>Interested in a coming-soon product? Register interest and we'll reach out first.</p>
          </div>
          <div className={styles.ctaActions}>
            <AppLink href={quoteHref} className={`${styles.btn} ${styles.btnNavy}`}>
              Book an OT demo
            </AppLink>
            <AppLink href={quoteHref} className={`${styles.btn} ${styles.btnOutline}`}>
              Request a quote
            </AppLink>
          </div>
        </div>
      </section>
    </div>
  )
}
