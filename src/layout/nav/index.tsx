import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { StyledNavDestop } from '../styles';
import { VerticalNav } from '@/components/nav';

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export default function NavLayout({ open, onClose }: Props) {
  const theme = useTheme();
  const isDestop = useMediaQuery(theme.breakpoints.up('md'));

  if (!isDestop) {
    return (
      <Drawer open={open} onClose={onClose}>
        <VerticalNav />
      </Drawer>
    );
  }

  return (
    <StyledNavDestop>
      <VerticalNav />
    </StyledNavDestop>
  );
}
