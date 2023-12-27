import { styled } from '@mui/material';

export const StyledContainer = styled('div')(() => ({
  display: 'flex',
  height: '100vh',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexBasis: '60%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const StyledContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexBasis: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px',
  [theme.breakpoints.down('md')]: {
    flex: 1,
  },
}));
