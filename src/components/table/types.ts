import { ReactNode } from 'react';

export interface UseTableProps {
  defaultSortBy?: string;
  defaultSortOrder?: 'asc' | 'desc';
  defaultPage?: number;
  defaultRowsPerPage?: number;
}

export interface UseTable {
  sortBy: UseTableProps['defaultSortBy'];
  sortOrder: UseTableProps['defaultSortOrder'];
  page: number;
  rowsPerPage: number;
  onSort: (key: string) => void;
  setRowsPerPage: (limit: number) => void;
  onPageChange: (page: number) => void;
  onRowPerPageChange: (rowPerPage: number) => void;
}

export interface Column<T = unknown> {
  key: string;
  title?: string | ReactNode;
  sortBy?: string;
  render?: (record: T, index: number) => ReactNode | string | number;
}

export interface CustomTableProps<T = unknown> {
  table: UseTable;
  dataSource?: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  hasPagination?: boolean;
  totalCount?: number;
}
