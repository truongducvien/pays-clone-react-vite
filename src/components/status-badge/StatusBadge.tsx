/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLOR_STATUS_MAPPING } from '@/constants';
import { Box, BoxProps, Typography } from '@mui/material';

interface Props extends BoxProps {
  title: string;
  type: keyof typeof COLOR_STATUS_MAPPING;
  status: any;
}

export default function StatusBadge({ title, type, status, ...rest }: Props) {
  const colorSet = COLOR_STATUS_MAPPING?.[type] as any;

  return (
    <Box
      padding={'2px 8px'}
      bgcolor={colorSet?.[status]?.bgcolor}
      borderRadius={'16px'}
      width={'fit-content'}
      {...rest}
    >
      <Typography color={colorSet?.[status]?.color} variant="subtitle1" fontWeight={600}>
        {title}
      </Typography>
    </Box>
  );
}
