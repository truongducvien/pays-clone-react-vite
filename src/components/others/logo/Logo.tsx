import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, BoxProps, Link } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo: FC<LogoProps> = ({ disabledLink = false, sx }) => {
  const logo = (
    <Box
      component='img'
      src={'/fe-public-icons/logo.svg'}
      sx={{ cursor: disabledLink ? 'default' : 'pointer', maxWidth: '120px', ...sx }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to='/' component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
};

export default Logo;
