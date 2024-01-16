import { ListItemButtonProps, StackProps } from '@mui/material';
import { IRoleBasedGuard } from '~/auth/types';

// ----------------------------------------------------------------------

export type INavItem = {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active?: boolean;
  isExternalLink?: boolean;
};

export type NavItemProps = INavItem & ListItemButtonProps;

export type NavListProps = IRoleBasedGuard & {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  children?: NavListProps[];
};

export interface NavSectionProps extends StackProps {
  data: {
    subheader: string;
    items: NavListProps[];
  }[];
}
