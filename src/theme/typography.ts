import { ThemeOptions } from '@mui/material';

type BreakPoint = 'sm' | 'md' | 'lg';

const responsiveFontSize = ({ sm, md, lg }: Partial<Record<BreakPoint, number>>) => ({
  fontSize: md || lg || sm || 14,
  '@media (min-width: 1200px)': {
    fontSize: lg,
  },
});

const getTypography = (): ThemeOptions['typography'] => ({
  fontFamily: ['Open Sans', 'sans-serif'].join(),
  allVariants: {
    color: '#212B36',
  },
  h1: {
    lineHeight: 42 / 34,
    fontWeight: 700,
    ...responsiveFontSize({ lg: 34 }),
  },
  h2: {
    lineHeight: 48 / 32,
    fontWeight: 700,
    ...responsiveFontSize({ lg: 32 }),
  },
  h3: {
    lineHeight: 36 / 24,
    fontWeight: 700,
    ...responsiveFontSize({ lg: 24 }),
  },
  h4: {
    lineHeight: 28 / 18,
    ...responsiveFontSize({ lg: 18 }),
  },
  h5: {
    lineHeight: 24 / 16,
    ...responsiveFontSize({ lg: 16 }),
  },
  subtitle1: {
    lineHeight: 18 / 12,
    ...responsiveFontSize({ lg: 12 }),
  },
  subtitle2: {
    lineHeight: 15 / 10,
    ...responsiveFontSize({ lg: 10 }),
  },
  caption: {
    lineHeight: 22 / 14,
    ...responsiveFontSize({ lg: 14 }),
  },
});

export default getTypography;
