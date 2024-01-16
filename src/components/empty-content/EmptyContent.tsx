import { Box, Stack, Typography } from '@mui/material';

interface Props {
  title?: string;
}

export default function EmptyContent({ title = 'No data' }: Props) {
  return (
    <Stack width={'100%'} alignItems={'center'}>
      <Typography variant={'h4'} color={'grey.500'}>
        {title}
      </Typography>
      <Box component={'img'} src="public-images/background.png" width={'30%'} />
    </Stack>
  );
}
