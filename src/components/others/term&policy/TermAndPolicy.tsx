import { Box, Link, Stack, StackProps, Typography } from '@mui/material';
import { ROUTE_PATH } from '~/routes/paths';

import { Link as RouterLink } from 'react-router-dom';
import { useLocales } from '~/locales';

const TermAndPolicy = (props: StackProps) => {
  const { translate } = useLocales();
  return (
    <Stack
      spacing={0.5}
      px={2.5}
      py={3}
      alignItems={'center'}
      direction={'row'}
      justifyContent={'center'}
      width={'100%'}
      {...props}
    >
      <Link to={ROUTE_PATH.termsConditions} component={RouterLink} sx={{ display: 'inline' }} color='text.secondary'>
        <Typography variant='body2' fontSize={'12px'}>
          {translate('label.termsAndConditions')}
        </Typography>
      </Link>
      <Box component={'span'} color='text.secondary'>
        ·
      </Box>
      <Link to={ROUTE_PATH.privacyPolicy} component={RouterLink} sx={{ display: 'inline' }} color='text.secondary'>
        <Typography variant='body2' fontSize={'12px'}>
          {translate('label.privacyPolicy')}
        </Typography>
      </Link>
    </Stack>
  );
};

export default TermAndPolicy;
