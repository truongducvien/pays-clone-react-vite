import { styled } from '@mui/material';

export const StyledContainer = styled('div')(() => ({
  display: 'flex',
  width: '100vw',
  height: '100vh',
}));

export const StyledNavDestop = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexBasis: '20%',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const StyledContent = styled('div')(() => ({
  flex: 1,
  padding: '20px',
}));
