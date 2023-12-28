import { ReactNode } from 'react';

export interface MenuItemType {
  key: string;
  title: string;
  icon: ReactNode; // svg
  path: string;
  permissions: string[];
  children?: MenuItemType[];
}
