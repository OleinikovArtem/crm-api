export interface PaginationOutput<T> {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}
