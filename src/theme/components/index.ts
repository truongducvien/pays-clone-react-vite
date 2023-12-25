import { ThemeOptions } from '@mui/material';
import Button from './Button';

const getComponents = (): ThemeOptions['components'] => ({
  ...Button(),
});

export default getComponents;
