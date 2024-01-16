import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { CustomTableProps, UseTable } from '.';
import { EmptyContent } from '../empty-content';

interface Props<T> {
  dataSource: CustomTableProps<T>['dataSource'];
  table?: UseTable;
  columns: CustomTableProps<T>['columns'];
  isLoading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TBodyCustom<T extends Record<string, any>>({
  dataSource,
  table,
  columns,
  isLoading,
}: Props<T>) {
  return (
    <TableBody>
      {isLoading &&
        !!table?.rowsPerPage &&
        Array.from(new Array(table.rowsPerPage)).map((_, index) => (
          <TableRow key={index}>
            {!!columns.length &&
              columns.map((col) => (
                <TableCell key={col.key as string}>
                  <Skeleton />
                </TableCell>
              ))}
          </TableRow>
        ))}

      {!isLoading && !dataSource?.length && (
        <TableRow>
          <TableCell colSpan={12} sx={{ borderBottom: 'unset' }}>
            <EmptyContent />
          </TableCell>
        </TableRow>
      )}

      {!isLoading &&
        !!dataSource?.length &&
        dataSource.map((item, index) => (
          <TableRow key={item.id || index}>
            {!!columns.length &&
              columns.map((col) => (
                <TableCell key={col.key as string}>
                  {col.render ? col.render(item, index) : item[col.key] || ''}
                </TableCell>
              ))}
          </TableRow>
        ))}
    </TableBody>
  );
}
