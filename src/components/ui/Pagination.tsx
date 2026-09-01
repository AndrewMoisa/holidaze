import type { ApiMeta } from '../../types/api'
import { Button } from './Button'

interface PaginationProps {
  meta: ApiMeta
  onPageChange: (page: number) => void
}

export function Pagination({ meta, onPageChange }: PaginationProps) {
  if (!meta.pageCount || meta.pageCount <= 1) return null

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button
        variant="secondary"
        disabled={meta.isFirstPage}
        onClick={() => meta.previousPage && onPageChange(meta.previousPage)}
      >
        Previous
      </Button>
      <span className="text-ink-900/60 text-sm">
        Page {meta.currentPage} of {meta.pageCount}
      </span>
      <Button
        variant="secondary"
        disabled={meta.isLastPage}
        onClick={() => meta.nextPage && onPageChange(meta.nextPage)}
      >
        Next
      </Button>
    </div>
  )
}
