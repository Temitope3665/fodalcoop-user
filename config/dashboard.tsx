import {
  DashboardIcon,
  GuarantorIcon,
  LoanIcon,
  MarketPlaceIcon,
  SavingsIcon,
  VotingIcon,
} from '@/assets/svgs';
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
      icon: <DashboardIcon />,
    },
    {
      title: 'Loans',
      href: '/loans',
      icon: <LoanIcon />,
    },
    {
      title: 'Savings',
      href: '/savings',
      icon: <SavingsIcon />,
    },
    {
      title: 'Guarantors',
      href: '/guarantors',
      icon: <GuarantorIcon />,
    },
    {
      title: 'Marketplace',
      href: '/market-place',
      icon: <MarketPlaceIcon />,
    },
    {
      title: 'Voting',
      href: '/voting',
      icon: <VotingIcon />,
    },
  ],
};
