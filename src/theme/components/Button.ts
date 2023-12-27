import { CSSInterpolation, ComponentsPropsList, ThemeOptions } from '@mui/material';

export default function Button(): ThemeOptions['components'] {
  const rootStyle = ({
    ownerState,
  }: {
    ownerState: ComponentsPropsList['MuiButton'] & Record<string, unknown>;
  }): CSSInterpolation => {
    const isContainedVariant = ownerState.variant === 'contained';

    const generalStyle: CSSInterpolation = {
      borderRadius: '8px',
      lineHeight: '24px',
      textTransform: 'unset',
      padding: '10px 16px',
    };

    // Style with variant:
    const variantStyle: CSSInterpolation = {
      ...(isContainedVariant && {}),
    };

    return {
      ...generalStyle,
      ...variantStyle,
    };
  };

  return {
    MuiButton: {
      styleOverrides: {
        root: rootStyle,
      },
    },
  };
}
