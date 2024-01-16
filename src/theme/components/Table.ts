import { CSSInterpolation, ThemeOptions } from '@mui/material';

export default function Table(): ThemeOptions['components'] {
  const headRootStyle = (): CSSInterpolation => {
    return {
      '.MuiTableCell-head': {
        fontWeight: 600,
      },
    };
  };

  const cellRootStyle = ({ theme }: { theme: ThemeOptions }): CSSInterpolation => {
    return {
      color: theme.palette?.grey?.[600],
      fontWeight: 500,
      fontSize: 13,
    };
  };

  return {
    MuiTableHead: {
      styleOverrides: {
        root: headRootStyle,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: cellRootStyle,
      },
    },
  };
}
