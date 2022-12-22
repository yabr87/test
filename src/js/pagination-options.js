function paginationOptions(totalResults, totalPages = 0) {
  return {
    totalItems: totalResults,
    itemsPerPage: 20,
    visiblePages: 3,
    centerAlign: true,
    firstItemClassName: 'pagination-first-child',
    lastItemClassName: 'pagination-last-child',
    usageStatistics: true,
  };
}

export { paginationOptions };
