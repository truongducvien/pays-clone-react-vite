import { useCallback, useState } from 'react';
//
import { TableProps } from './types';

type UseTableProps = {
  defaultDense?: boolean;
  defaultSort?: 'asc' | 'desc';
  defaultSortBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export default function useTable(props?: UseTableProps): TableProps {
  const {
    defaultSortBy,
    defaultSort,
    defaultCurrentPage = 0,
    defaultRowsPerPage = 10,
    defaultSelected = [],
  } = props || {};
  const [sortBy, setSortBy] = useState<string | undefined>(defaultSortBy);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(defaultSort);

  const [page, setPage] = useState(defaultCurrentPage);

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const onSort = useCallback(
    (key: string) => {
      const isAsc = sortBy === key && sortOrder === 'asc';
      if (key) {
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortBy(key);
      }
    },
    [sortOrder, sortBy]
  );

  const onSelectRow = useCallback(
    (id: string) => {
      const selectedIndex = selected.indexOf(id);

      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelected: string[]) => {
    if (checked) {
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, []);

  const onChangePage = useCallback((newPage: number) => {
    setSelected([]);
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  return {
    sortOrder,
    page,
    sortBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    params: {
      skipCount: page * rowsPerPage,
      maxResultCount: rowsPerPage,
      sortBy,
      sortOrder,
    },
  };
}
