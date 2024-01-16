import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  actions?: ReactNode[];
}

export default function AdminHeader({ title, description = '', actions }: Props) {
  return (
    <Box display={'flex'} justifyContent={'space-between'} p={'20px'}>
      <Box>
        <Typography variant="h4" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="caption" color={'grey.500'}>
          {description}
        </Typography>
      </Box>
      <Box display={'flex'} gap={'16px'}>
        {!!actions?.length && actions.map((item, index) => <Box key={index}>{item}</Box>)}
      </Box>
    </Box>
  );
}
