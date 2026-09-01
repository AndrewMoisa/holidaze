export interface ApiMeta {
  isFirstPage?: boolean
  isLastPage?: boolean
  currentPage?: number
  previousPage?: number | null
  nextPage?: number | null
  pageCount?: number
  totalCount?: number
}

export interface ApiResponse<T> {
  data: T
  meta: ApiMeta
}

export interface ApiErrorItem {
  message: string
  code?: string
  path?: (string | number)[]
}

export interface ApiErrorBody {
  errors: ApiErrorItem[]
  status: string
  statusCode: number
}
