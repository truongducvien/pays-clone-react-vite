import { Fragment, useState } from 'react';
// @mui
import { Checkbox, Divider, IconButton, MenuItem, TableCell, TableRow } from '@mui/material';
// hooks

// components
import Iconify from '~/components/iconify';
import MenuPopover from '~/components/menu-popover';
import { ColumnProps, RowAction } from './types';
//

// ----------------------------------------------------------------------

type Props<T> = {
  columns: ColumnProps<T>[];
  rowActions?: RowAction<T>[];
  row: T;
  selected: boolean;
  rowIndex: number;
  hasCheckbox?: boolean;
  onSelectRow: VoidFunction;
  onClickRow?: (row: T) => void;
};

export default function TableRowCustom<T extends Record<string, any>>({
  columns,
  rowActions,
  row,
  selected,
  onSelectRow,
  onClickRow,
  rowIndex,
  hasCheckbox,
}: Props<T>) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 1,
          '& .MuiTableCell-root': {
            bgcolor: 'background.default',
          },
          cursor: onClickRow ? 'pointer' : 'default',
        }}
        onClick={() => onClickRow?.(row)}
      >
        {hasCheckbox && (
          <TableCell
            padding='checkbox'
            sx={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          >
            <Checkbox checked={selected} onClick={onSelectRow} />
          </TableCell>
        )}

        {columns.map((column) => {
          const node = column.renderNode ? column.renderNode(row, rowIndex) : row?.[column.key];
          return (
            <TableCell
              key={column.key}
              align={column.align || 'left'}
              sx={{ color: 'text.secondary', ...column.cellSx }}
            >
              {node}
            </TableCell>
          );
        })}

        {!!rowActions?.length && (
          <TableCell
            align='right'
            sx={{
              whiteSpace: 'nowrap',
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            {!rowActions.every((it) => it.hidden?.(row)) && (
              <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                <Iconify icon='eva:more-vertical-fill' />
              </IconButton>
            )}
          </TableCell>
        )}
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow='right-top' sx={{ width: 160 }}>
        {rowActions?.map(
          (it, index) =>
            !it?.hidden?.(row) && (
              <Fragment key={index}>
                {it.showDivider && <Divider sx={{ borderStyle: 'dashed' }} />}
                <MenuItem
                  onClick={() => {
                    handleClosePopover();
                    it.onClick(row);
                  }}
                  sx={it.sx}
                >
                  {it.renderLabel ? (
                    it.renderLabel(row)
                  ) : (
                    <>
                      {it.icon && <Iconify icon={it.icon} />}
                      {it.label}
                    </>
                  )}
                </MenuItem>
              </Fragment>
            )
        )}
      </MenuPopover>
    </>
  );
}
