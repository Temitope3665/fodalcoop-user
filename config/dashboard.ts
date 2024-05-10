import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'Home',
    },
    {
      title: 'Setup',
      href: '/setup',
      icon: 'Settings2',
    },
    {
      title: 'Members',
      href: '/members',
      icon: 'Settings',
      submenu: true,
      subMenuItems: [
        { title: 'Manage Members', href: '/members' },
        { title: 'Rectify Profile', href: '/members/rectify' },
        { title: 'Import Members', href: '/members/import' },
      ],
    },
  ],
};
