import { ArrowRightIcon } from '@/components/icons'
import { Button } from '@/components/ui/Button/Button'
import { ProductCard, type ProductCardData } from '@/components/ui/ProductCard/ProductCard'
import styles from './Listing.module.css'

interface ListingProps {
  items: (ProductCardData & { categoryName: string })[]
  total: number
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  onClear: () => void
}

export function Listing({ items, total, page, pageCount, onPageChange, onClear }: ListingProps) {
  return (
    <section id="listing" className={styles.listing} aria-label="Products">
      <div className="container">
        <p className={styles.count} aria-live="polite">
          Showing <strong>{items.length}</strong> of <strong>{total}</strong> products
        </p>

        {items.length > 0 ? (
          <ul className={styles.grid}>
            {items.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} label={product.categoryName} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p>No products match your search.</p>
            <Button variant="outlineInk" size="sm" onClick={onClear}>
              Clear filters
            </Button>
          </div>
        )}

        {pageCount > 1 && (
          <nav className={styles.pagination} aria-label="Pagination">
            <button
              type="button"
              className={styles.page}
              aria-label="Previous page"
              disabled={page === 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ArrowRightIcon width={14} height={14} className={styles.prev} />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={styles.page}
                aria-label={`Page ${n}`}
                aria-current={n === page ? 'page' : undefined}
                onClick={() => onPageChange(n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className={styles.page}
              aria-label="Next page"
              disabled={page === pageCount}
              onClick={() => onPageChange(page + 1)}
            >
              <ArrowRightIcon width={14} height={14} />
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
