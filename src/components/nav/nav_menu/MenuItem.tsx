import { useState } from 'react';
import { Button, Collapse, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { StyledCollapseIcon, StyledMenuItem } from './styles';
import { useActiveLink } from '@/hooks';
import { MenuItemType } from './types';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function MenuItem({ data, depth = 0 }: { data: MenuItemType; depth?: number }) {
  const { isActive } = useActiveLink(data.path);

  const [open, setOpen] = useState(isActive);

  const handleToggle = () => {
    setOpen(!open);
  };

  const renderSymbol = () => {
    const icon = data.icon;
    if (icon) return icon;

    if (!icon && depth > 0) {
      return isActive ? (
        <Icon icon={'carbon:dot-mark'} />
      ) : (
        <Icon icon={'radix-icons:dot-filled'} />
      );
    }

    return null;
  };

  const renderItem = () => (
    <Button fullWidth sx={{ padding: 0 }} onClick={handleToggle}>
      <StyledMenuItem active={isActive} depth={depth}>
        <Stack width={'fit-content'}>{renderSymbol()}</Stack>
        <Typography variant="caption" color={'inherit'} fontWeight={'inherit'}>
          {data.title}
        </Typography>

        {!!data.children?.length && (
          <StyledCollapseIcon>
            {open ? (
              <Icon icon={'mdi:chevron-down'} width={20} />
            ) : (
              <Icon icon={'mdi:chevron-right'} width={20} />
            )}
          </StyledCollapseIcon>
        )}
      </StyledMenuItem>
    </Button>
  );

  const renderSubItem = () => (
    <Collapse in={open}>
      {data?.children?.map((it) => (
        <MenuItem key={it.key} data={it} depth={depth + 1} />
      ))}
    </Collapse>
  );

  // With children:
  if (data.children?.length) {
    return (
      <Stack gap={'4px'}>
        {renderItem()}
        {!!data.children?.length && renderSubItem()}
      </Stack>
    );
  }

  // Without children:
  if (data.path) {
    return (
      <Link
        key={data.key}
        component={RouterLink}
        to={data.path ? data.path : ''}
        underline={'none'}
      >
        {renderItem()}
      </Link>
    );
  }

  return renderItem();
}
