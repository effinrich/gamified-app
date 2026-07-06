import { useState } from 'react'
import { css, cx } from 'styled-system/css'
import type { JobFilter } from '../types'

/**
 * `DiscoverFilters` — the page-level filter block.
 *
 * Editorial-bold treatment:
 *   - Mono uppercase label + value pairs (`View · All listings`,
 *     `View · High transparency`), not rounded chip buttons. The active
 *     option picks up an italic accent in `accent.solid`; the inactive
 *     option is muted. Clicking a row sets the active filter.
 *   - The search input gets a mono eyebrow above and a hairline underline
 *     beneath, instead of a full Park UI box. Controlled locally — the
 *     parent's `value` is a coarse `JobFilter` and doesn't model free-text
 *     search, so the field is a visual affordance and the parent stays
 *     the source of truth for the listing set.
 *   - Hairline `border.subtle` rules frame each filter row so the rail
 *     reads as a single editorial block.
 *   - Animation is limited to hover / focus / active state — utility chrome
 *     never staggers on mount.
 */
interface DiscoverFiltersProps {
  value: JobFilter
  onChange: (filter: JobFilter) => void
}

// Label each `JobFilter` maps to. Kept inline (not in `types.ts`) so the
// display copy is owned by the partial, not the data type.
const FILTER_LABELS: Record<JobFilter, string> = {
  all: 'All listings',
  quality: 'High transparency',
}

const FILTER_ORDER: readonly JobFilter[] = ['all', 'quality']

export function DiscoverFilters({ value, onChange }: DiscoverFiltersProps) {
  // Local-only — the parent doesn't model free-text search yet, but a real
  // field makes the rail feel usable. The value stays inside this partial
  // until search is wired into the discover pipeline.
  const [query, setQuery] = useState('')

  return (
    <div className={styles.root}>
      {/* Search — mono eyebrow + hairline underline. Stays visually restrained
          so it never out-shouts the filter rows beneath it. */}
      <div className={styles.searchGroup}>
        <span className={styles.searchEyebrow}>Search the issue</span>
        <label className={styles.searchField}>
          <span className={styles.searchIcon} aria-hidden>
            ⌕
          </span>
          <input
            className={styles.searchInput}
            type="text"
            value={query}
            placeholder="Role, company, stack…"
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search open roles"
          />
        </label>
        <div className={styles.searchRule} aria-hidden />
      </div>

      {/* Filter rows — one per `JobFilter`. Active state is italic accent. */}
      <ul className={styles.filterList} aria-label="Filter by view">
        {FILTER_ORDER.map((filter) => {
          const isActive = value === filter
          return (
            <li key={filter}>
              <button
                type="button"
                onClick={() => onChange(filter)}
                aria-pressed={isActive}
                className={cx(
                  styles.filterRow,
                  isActive && styles.filterRowActive,
                )}
              >
                <span className={styles.filterLabel}>View</span>
                <span className={styles.filterDot} aria-hidden>
                  ·
                </span>
                <span
                  className={cx(
                    styles.filterValue,
                    isActive && styles.filterValueActive,
                  )}
                >
                  {FILTER_LABELS[filter]}
                </span>
                <span
                  className={cx(
                    styles.filterTail,
                    isActive && styles.filterTailActive,
                  )}
                  aria-hidden
                />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const styles = {
  root: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
  }),
  // Search — eyebrow above the input, hairline underline below. The
  // underline is a fixed-weight hairline so the field reads as a single
  // editorial line, not a search-shaped input chrome.
  searchGroup: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '14px',
  }),
  searchEyebrow: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'fg.subtle',
  }),
  searchField: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingTop: '2px',
  }),
  searchIcon: css({
    fontFamily: 'mono',
    fontSize: '14px',
    color: 'fg.muted',
    lineHeight: 1,
  }),
  searchInput: css({
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    flex: '1',
    fontFamily: 'mono',
    fontSize: '12px',
    letterSpacing: '0.04em',
    color: 'fg.default',
    padding: '2px 0',
    _placeholder: { color: 'fg.subtle' },
  }),
  searchRule: css({
    height: '1px',
    backgroundColor: 'border.default',
  }),
  // Filter list — flat stack of editorial rows. No bullets, no chrome.
  filterList: css({
    listStyle: 'none',
    margin: '14px 0 0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
  }),
  // Filter row — mono label + middot + value, with a hairline tail that
  // fills when active. Hover / focus / active states are the only places
  // anything animates.
  filterRow: css({
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    borderTopWidth: '1px',
    borderColor: 'border.subtle',
    color: 'fg.muted',
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr auto',
    alignItems: 'baseline',
    columnGap: '8px',
    padding: '12px 0 12px',
    textAlign: 'left',
    transition: 'color 200ms ease',
    _hover: { color: 'fg.default' },
    _focusVisible: {
      outline: '2px solid token(colors.accent.solid)',
      outlineOffset: '2px',
    },
  }),
  filterRowActive: css({
    color: 'fg.default',
  }),
  filterLabel: css({
    fontFamily: 'mono',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
  }),
  filterDot: css({
    fontFamily: 'mono',
    fontSize: '10px',
    color: 'fg.subtle',
  }),
  filterValue: css({
    fontFamily: 'display',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: 1.3,
    letterSpacing: '-0.005em',
  }),
  // The active value picks up italic + accent.solid — the italic-accent
  // gesture that the dashboard's `tocLinkActive` uses. This is the soft
  // visual signal that the row is selected; the filled tail confirms it.
  filterValueActive: css({
    fontStyle: 'italic',
    color: 'accent.solid',
  }),
  filterTail: css({
    height: '1px',
    width: '16px',
    backgroundColor: 'border.default',
    alignSelf: 'center',
    transition: 'width 200ms ease, background-color 200ms ease',
  }),
  filterTailActive: css({
    width: '32px',
    backgroundColor: 'accent.solid',
  }),
}
