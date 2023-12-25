import { ThemeProvider } from '@emotion/react';
import { ReactNode, createContext, useState } from 'react';
import { ThemeContextType, ThemeMode } from './types';
import { Box, Button, ThemeOptions, Typography, createTheme } from '@mui/material';
import getPalette from './palette';
import GlobalStyles from './GlobalStyles';
import getTypography from './typography';
import getComponents from './components';

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  let theme: ThemeOptions = createTheme({
    palette: getPalette(mode),
  });

  theme = createTheme({
    ...theme,
    typography: getTypography(),
    components: getComponents(),
  });

  return (
    <ThemeContext.Provider value={{ setMode }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Box height={'80vh'} width={'60vw'} border={'1px dashed'}>
          <Button variant="contained" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
            Change mode
          </Button>
          <Typography variant="h1">Hello world</Typography>
        </Box>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
