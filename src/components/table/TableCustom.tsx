import { Table, TableContainer, TableFooter, TablePagination, TableRow } from '@mui/material';
import { CustomTableProps } from './types';
import THeadCustom from './THeadCustom';
import TBodyCustom from './TBodyCustom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableCustom<T extends Record<string, any>>(props: CustomTableProps<T>) {
  const { table, dataSource, columns, isLoading = false, hasPagination = true, totalCount } = props;

  return (
    <TableContainer>
      <Table>
        <THeadCustom columns={columns} table={table} />
        <TBodyCustom
          columns={columns}
          table={table}
          dataSource={dataSource || []}
          isLoading={isLoading}
        />
        <TableFooter>
          <TableRow>
            {hasPagination && !!totalCount && (
              <TablePagination
                // colSpan={7}
                count={totalCount}
                rowsPerPage={table.rowsPerPage}
                rowsPerPageOptions={[]}
                page={table.page}
                sx={{
                  '&.MuiTablePagination-root': {
                    borderBottom: 'unset',
                  },
                }}
                onPageChange={(_, page) => table.onPageChange(page)}
                onRowsPerPageChange={(e) => table.onRowPerPageChange(parseInt(e.target.value))}
                // ActionsComponent={TablePaginationActions}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
