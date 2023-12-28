import { Box, Stack, Typography } from '@mui/material';
import menu from './config';
import { MenuItemType } from './types';
import MenuItem from './MenuItem';

export default function NavMenu() {
  return (
    <Stack gap={'16px'} width={'100%'} flex={1} overflow={'auto'}>
      {menu.map((item, index) => (
        <Stack key={item.subHeader || index} width={'100%'}>
          <Box>
            <Typography
              variant={'subtitle1'}
              color={'grey.500'}
              padding={'24px 16px 8px'}
              sx={{ textTransform: 'uppercase', fontWeight: 700 }}
            >
              {item.subHeader}
            </Typography>
          </Box>
          <Stack width={'100%'} gap={'4px'}>
            {!!item.items.length &&
              item.items.map((it) => <MenuItem key={it.key} data={it as MenuItemType} />)}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
