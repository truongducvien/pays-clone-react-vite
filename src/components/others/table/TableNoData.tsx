// @mui
import { TableCell, TableRow } from '@mui/material';
//
import { useLocales } from '~/locales';
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

export default function TableNoData() {
  const { translate } = useLocales();

  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyContent
          title={translate('description.noData')}
          sx={{
            '& span.MuiBox-root': { height: 160 },
          }}
        />
      </TableCell>
    </TableRow>
  );
}
