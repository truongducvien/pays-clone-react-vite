import { forwardRef } from 'react';
// icons
import { Icon, IconifyIcon } from '@iconify/react';
// @mui
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  icon: IconifyIcon | string;
}

const Iconify = forwardRef<SVGElement, Props>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width: width, height: width, ...sx }} {...other} />
));

export default Iconify;
