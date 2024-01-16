// ----------------------------------------------------------------------

import { IconifyIcon } from '@iconify/react/dist/iconify.js';
import { SxProps, TableCellProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export type TableProps = {
  page: number;
  rowsPerPage: number;
  sortOrder?: 'asc' | 'desc';
  sortBy?: string;
  selected: string[];
  params: {
    skipCount: number;
    maxResultCount: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
  //
  onSelectRow: (id: string) => void;
  onSelectAllRows: (checked: boolean, newSelected: string[]) => void;
  onSort: (id: string) => void;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ColumnProps<T = unknown> = {
  header: ReactNode;
  key: string;
  renderNode?: (row: T, index: number) => ReactNode;
  sortBy?: string;
  align?: TableCellProps['align'];
  sx?: SxProps<Theme>;
  cellSx?: SxProps<Theme>;
};

export type RowAction<T = unknown> = {
  label?: ReactNode;
  renderLabel?: (row: T) => ReactNode;
  icon?: string | IconifyIcon;
  onClick: (row: T) => void;
  hidden?: (row: T) => void;
  showDivider?: boolean;
  sx?: SxProps<Theme>;
};
