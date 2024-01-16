import { ThemeOptions } from '@mui/material';
import Button from './Button';
import Table from './Table';
import Input from './Input';

const getComponents = (): ThemeOptions['components'] => ({
  ...Button(),
  ...Table(),
  ...Input(),
});

export default getComponents;
