import { CSSInterpolation, Theme, ThemeOptions } from '@mui/material';

export default function Input(): ThemeOptions['components'] {
  return {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }): CSSInterpolation => ({
          '&.MuiTextField-root .MuiInputBase-root': {
            borderRadius: theme.shape.borderRadius,
            borderColor: theme?.palette?.grey[300],
          },
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === 'small' && {
            '.MuiInputBase-input': {
              padding: 10,
              paddingLeft: 5,
            },
          }),
        }),
      },
    },
  };
}
