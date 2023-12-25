import { PaletteOptions } from '@mui/material';
import { ThemeMode } from './types';

const getPalette = (mode: ThemeMode): PaletteOptions => ({
  mode,
  // LIGHT MODE
  ...(mode === 'light' && {
    primary: {
      light: '#81c784',
      main: '#4caf4f',
      dark: '#388e3b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#3c7575',
      main: '#336162',
      dark: '#224646',
      contrastText: '#fff',
    },
    error: { main: '#e53835' },
    warning: { main: '#fbc02d' },
    info: { main: '#2194f3' },
    success: { main: '#2e7d31' },
    background: {
      default: '#f0f6fd',
    },
    grey: {
      100: '#919EAB52',
    },
  }),

  // DARK MODE:
  ...(mode === 'dark' && {
    primary: {
      main: '#263238',
      contrastText: '#fff',
    },
    secondary: {
      light: '#3c7575',
      main: '#336162',
      dark: '#224646',
      contrastText: '#fff',
    },
    error: { main: '#e53835' },
    warning: { main: '#fbc02d' },
    info: { main: '#2194f3' },
    success: { main: '#2e7d31' },
    background: {
      default: '#4d4d4d',
    },
    grey: {
      100: '#919EAB52',
    },
  }),
});

export default getPalette;
