import { PaletteOptions, alpha } from '@mui/material';
import { ThemeMode } from './types';

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const getPalette = (mode: ThemeMode): PaletteOptions => ({
  mode,
  grey: GREY,
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

  // LIGHT MODE
  ...(mode === 'light' && {
    primary: {
      light: '#81c784',
      main: '#4caf4f',
      dark: '#388e3b',
      contrastText: '#fff',
    },
    error: { main: '#e53835' },
    warning: { main: '#fbc02d' },
    info: { light: '#EFF8FF', main: '#2194f3' },
    success: { light: '#5DFFA736', main: '#2e7d31' },
    background: {
      default: '#f0f6fd',
      paper: '#fff',
    },
    action: {
      hover: alpha(GREY[500], 0.08),
    },
  }),

  // DARK MODE:
  ...(mode === 'dark' && {
    primary: {
      main: '#263238',
      contrastText: '#fff',
    },
    background: {
      default: '#4d4d4d',
    },
    action: {
      hover: alpha(GREY[500], 0.08),
    },
  }),
});

export default getPalette;
