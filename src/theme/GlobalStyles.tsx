import { GlobalStyles as MUIGlobalStyles, useTheme } from '@mui/material';

const GlobalStyles = () => {
  const theme = useTheme();
  return (
    <MUIGlobalStyles
      styles={{
        body: {
          margin: 0,
          backgroundColor: theme?.palette?.background?.default,
        },
        '.MuiFormControl-root .MuiOutlinedInput-notchedOutline': {
          borderColor: theme?.palette?.grey[100],
        },
        '.MuiFormControl-root .MuiFormHelperText-root': {
          fontSize: theme.typography.subtitle1.fontSize,
        },
      }}
    />
  );
};

export default GlobalStyles;
