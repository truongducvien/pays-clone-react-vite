// @mui
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { ColumnProps, TableProps } from './types';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

type Props<T> = {
  columns: ColumnProps<T>[];
  sortOrder?: TableProps['sortOrder'];
  sortBy?: string;
  hasCheckbox?: boolean;
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
};

export default function TableHeadCustom<T>({
  columns,
  sortOrder,
  sortBy,
  hasCheckbox,
  rowCount = 0,
  numSelected = 0,
  onSort,
  onSelectAllRows,
}: Props<T>) {
  return (
    <TableHead
      sx={{
        '& .MuiTableCell-head': {
          bgcolor: 'transparent',
        },
      }}
    >
      <TableRow>
        {hasCheckbox && onSelectAllRows && (
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectAllRows(event.target.checked)}
            />
          </TableCell>
        )}

        {columns.map((c) => (
          <TableCell
            key={c.key}
            align={c.align || 'left'}
            sortDirection={sortBy === c.sortBy ? sortOrder : false}
            sx={{ whiteSpace: 'pre', ...c.sx }}
          >
            {onSort && c.sortBy ? (
              <TableSortLabel
                hideSortIcon
                active={sortBy === c.sortBy}
                direction={sortBy === c.sortBy ? sortOrder : 'asc'}
                onClick={() => c.sortBy && onSort(c.sortBy)}
                sx={{ textTransform: 'capitalize' }}
              >
                {c.header}

                {sortBy === c.sortBy ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              c.header
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
