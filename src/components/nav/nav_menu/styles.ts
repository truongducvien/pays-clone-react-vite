import { CSSInterpolation, alpha, styled } from '@mui/material';

interface StyledMenuItemProps {
  active: boolean;
  depth: number;
}

export const StyledMenuItem = styled('div')<StyledMenuItemProps>(({ active, depth, theme }) => {
  const { palette } = theme;

  const hoverStyle: CSSInterpolation = {
    backgroundColor: palette.action.hover,
  };

  const activeStyle: CSSInterpolation = {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
    fontWeight: 600,
  };

  const subItemStyle: CSSInterpolation = {
    backgroundColor: 'white',
  };

  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '18px',
    padding: '12px 16px',
    borderRadius: '8px',
    color: theme.palette.grey[600],
    // Hover:
    ...(!active && { '&:hover': { ...hoverStyle } }),

    // Active:
    ...(active && activeStyle),

    // Sub item:
    ...(depth > 0 && subItemStyle),
  };
});

export const StyledCollapseIcon = styled('div')({
  position: 'absolute',
  right: '16px',
  display: 'flex',
  alignItems: 'center',
});
