import { Outlet } from 'react-router-dom';
import { StyledContainer, StyledContent } from './styles';
import NavLayout from '../nav';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMediaQuery, useTheme } from '@mui/material';

export default function AdminLayout() {
  const theme = useTheme();
  const isDestop = useMediaQuery(theme.breakpoints.up('md'));

  const [openNavMobile, setOpenNavMobile] = useState<boolean>(false);

  return (
    <StyledContainer>
      <NavLayout open={openNavMobile} onClose={() => setOpenNavMobile(false)} />

      <StyledContent>
        {!isDestop && (
          <Icon icon={'ant-design:menu-fold-outlined'} onClick={() => setOpenNavMobile(true)} />
        )}
        <Outlet />
      </StyledContent>
    </StyledContainer>
  );
}
