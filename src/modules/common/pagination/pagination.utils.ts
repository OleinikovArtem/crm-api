export function calculatePagination({ totalCount, limit, currentPage }: { totalCount: number, limit: number, currentPage: number }) {
  return {
    totalCount,
    currentPage,
    totalPages: Math.ceil(totalCount / limit),
  } as const
}
