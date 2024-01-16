import { useCallback, useState } from 'react';
import { UseTable, UseTableProps } from '.';

export default function useTable(props?: UseTableProps): UseTable {
  const { defaultSortBy, defaultSortOrder, defaultPage = 0, defaultRowsPerPage = 10 } = props || {};

  const [sortBy, setSortBy] = useState<UseTableProps['defaultSortBy']>(defaultSortBy);
  const [sortOrder, setSortOrder] = useState<UseTableProps['defaultSortOrder']>(
    defaultSortOrder || 'asc'
  );
  const [page, setPage] = useState<number>(defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);

  const onSort = useCallback(
    (key: string) => {
      if (key === sortBy) {
        setSortOrder?.(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortBy?.(key);
        setSortOrder?.('asc');
      }
      setPage(0);
    },
    [sortBy, sortOrder]
  );

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onRowPerPageChange = (rowPerPage: number) => {
    setPage(0);
    setRowsPerPage(rowPerPage);
  };

  return {
    sortBy,
    sortOrder,
    page,
    rowsPerPage,
    onSort,
    setRowsPerPage,
    onPageChange,
    onRowPerPageChange,
  };
}
