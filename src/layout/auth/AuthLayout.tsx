import i18n from '@/locales';
import { Box, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { StyledContainer, StyledContent, StyledSection } from './styled';

export default function AuthLayout() {
  return (
    <StyledContainer>
      <StyledSection>
        <Stack
          height={'fit-content'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography variant="h1">
            {i18n.t('title.hi')}, {i18n.t('title.welcomeBack')}
          </Typography>
          <Box>
            <Box
              component={'img'}
              src="/public-images/login_background.png"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Stack>
      </StyledSection>

      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledContainer>
  );
}
