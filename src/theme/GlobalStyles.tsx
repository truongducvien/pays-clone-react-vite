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
        '.MuiFormControl-root .MuiFormHelperText-root': {
          fontSize: theme.typography.subtitle1.fontSize,
        },
        '.MuiTable-root .MuiTableSortLabel-root.Mui-active': {
          color: 'unset',
        },
      }}
    />
  );
};

export default GlobalStyles;
