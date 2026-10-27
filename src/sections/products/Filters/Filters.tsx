import { ChevronDownIcon, SearchIcon } from '@/components/icons'
import styles from './Filters.module.css'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
] as const

interface FiltersProps {
  categories: { id: string; name: string; count: number }[]
  total: number
  category: string
  query: string
  sort: string
  onCategoryChange: (category: string) => void
  onQueryChange: (query: string) => void
  onSortChange: (sort: string) => void
}

export function Filters({
  categories,
  total,
  category,
  query,
  sort,
  onCategoryChange,
  onQueryChange,
  onSortChange,
}: FiltersProps) {
  const chips = [{ id: '', name: 'All products', count: total }, ...categories]

  return (
    <div className={styles.filters}>
      <div role="group" aria-label="Filter by category" className={styles.chips}>
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={styles.chip}
            aria-pressed={chip.id === category}
            onClick={() => onCategoryChange(chip.id)}
          >
            {chip.name}
            <span className={styles.count}>{String(chip.count).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <label className={styles.search}>
          <SearchIcon width={16} height={16} className={styles.searchIcon} />
          <span className="visually-hidden">Search products</span>
          <input
            type="search"
            placeholder="Search products"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </label>

        <label className={styles.sort}>
          <span className={styles.sortLabel}>Sort</span>
          <span className={styles.select}>
            <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon width={14} height={14} className={styles.chevron} />
          </span>
        </label>
      </div>
    </div>
  )
}
