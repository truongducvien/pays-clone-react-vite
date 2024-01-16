// @mui
import { Skeleton, Stack, TableCell, TableRow, TableRowProps } from '@mui/material';

// ----------------------------------------------------------------------
interface Props extends TableRowProps {
  hasCheckbox?: boolean;
}

export default function TableSkeleton({ hasCheckbox, ...other }: Props) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={12}>
        <Stack spacing={3} direction='row' alignItems='center'>
          {hasCheckbox && (
            <Skeleton variant='rectangular' width={26} height={26} sx={{ borderRadius: 1, flexShrink: 0 }} />
          )}
          <Skeleton variant='text' width='20%' height={36} />
          <Skeleton variant='text' width='20%' height={36} />
          <Skeleton variant='text' width='20%' height={36} />
          <Skeleton variant='text' width='20%' height={36} />
          <Skeleton variant='text' width='20%' height={36} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
