import { User } from '@prisma/client';
import type { Icon } from 'lucide-react';

import { Icons } from '@/components/icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  href: string;
  submenu?: boolean;
  icon: React.ReactNode;
  subMenuItems?: SidebarNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};
