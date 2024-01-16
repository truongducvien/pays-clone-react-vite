import { ROUTES } from '@/constants';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavMenu from './nav_menu';
import AccountSection from '../account-section';

export default function VerticalNav() {
  const navigate = useNavigate();

  return (
    <Stack
      width={'100%'}
      height={'100%'}
      boxSizing={'border-box'}
      padding={'22px 16px'}
      justifyContent={'space-between'}
      bgcolor={'white'}
    >
      <Stack gap={'16px'} flex={1} overflow={'auto'}>
        <Stack gap={'42px'}>
          <Box
            component={'img'}
            width={'102px'}
            height={'32px'}
            src="/public-images/logo.png"
            onClick={() => navigate(ROUTES.ROOT)}
            sx={{ cursor: 'pointer' }}
          />
          <AccountSection />
        </Stack>

        <NavMenu />
      </Stack>
      <Button>Log out</Button>
    </Stack>
  );
}
