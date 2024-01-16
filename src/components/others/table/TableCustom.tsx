// @mui
import { Box, Table, TableBody, TableContainer, TablePagination } from '@mui/material';

// components
import { ColumnProps, RowAction, TableHeadCustom, TableNoData, TableProps, TableSkeleton } from '~/components/table';
import TableRowCustom from './TableRowCustom';

type Props<T> = {
  columns: ColumnProps<T>[];
  rowActions?: RowAction<T>[];
  table: TableProps;
  data: T[];
  totalRows: number;
  isLoading?: boolean;
  hasCheckbox?: boolean;
  onClickRow?: (row: T) => void;
};

export default function TableCustom<T extends Record<string, any>>({
  columns,
  rowActions,
  table,
  data,
  totalRows,
  isLoading,
  hasCheckbox,
  onClickRow,
}: Props<T>) {
  const {
    page,
    sortOrder,
    sortBy,
    rowsPerPage,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = table;

  return (
    <>
      <Box sx={{ px: 1, position: 'relative', borderRadius: 1.5, bgcolor: 'background.neutral' }}>
        {/* <TableSelectedAction
          numSelected={selected.length}
          rowCount={data.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              data.map((row) => row.id)
            )
          }
          action={
            <>
              <IconButton color='primary'>
                <Iconify icon='eva:trash-2-outline' />
              </IconButton>
              <IconButton color='primary'>
                <Iconify icon='eva:trash-2-outline' />
              </IconButton>
            </>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 8,
            left: 8,
            right: 8,
            width: 'auto',
            borderRadius: 1,
          }}
        /> */}

        <TableContainer>
          <Table
            size={'medium'}
            sx={{
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
              '& .MuiTableCell-head': {
                boxShadow: 'none !important',
              },
            }}
          >
            <TableHeadCustom
              columns={columns}
              sortOrder={sortOrder}
              sortBy={sortBy}
              hasCheckbox={hasCheckbox}
              rowCount={data.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  data.map((row) => row.id)
                )
              }
            />

            <TableBody>
              {!isLoading &&
                data.map((row, index) => (
                  <TableRowCustom
                    key={row.id ?? index}
                    rowIndex={index}
                    columns={columns}
                    row={row}
                    hasCheckbox={hasCheckbox}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => onSelectRow(row.id)}
                    onClickRow={onClickRow}
                    rowActions={rowActions}
                  />
                ))}

              {isLoading &&
                Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableSkeleton key={index} hasCheckbox={hasCheckbox} sx={{ bgcolor: 'white' }}></TableSkeleton>
                ))}

              {!isLoading && !data.length && <TableNoData />}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePagination
        count={totalRows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, page) => onChangePage(page)}
        onRowsPerPageChange={onChangeRowsPerPage}
        rowsPerPageOptions={[]}
        component={'div'}
        sx={{
          borderTop: 'none',
          '.MuiTablePagination-actions': { mr: 0 },
        }}
      />
    </>
  );
}
