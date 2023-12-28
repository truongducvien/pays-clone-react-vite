import { ROUTES } from '@/constants';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <Stack height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <Typography variant="h1">404 - Page not found!</Typography>
      <Link to={ROUTES.ROOT}>Back to home</Link>
    </Stack>
  );
}
