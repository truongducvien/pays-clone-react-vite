import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { CustomTableProps, UseTable } from '.';

interface Props<T> {
  table?: UseTable;
  columns: CustomTableProps<T>['columns'];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function THeadCustom<T extends Record<string, any>>({ columns, table }: Props<T>) {
  const { sortOrder, sortBy, onSort } = table || {};

  return (
    <TableHead>
      <TableRow>
        {!!columns.length &&
          columns.map((item) => (
            <TableCell key={item.key as string}>
              {onSort && item.sortBy ? (
                <TableSortLabel
                  active={sortBy === item.sortBy}
                  direction={sortOrder || 'asc'}
                  onClick={() => onSort(item.sortBy as string)}
                >
                  {item.title || ''}
                </TableSortLabel>
              ) : (
                item.title || ''
              )}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}
