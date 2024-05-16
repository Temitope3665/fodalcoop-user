import {
  DashboardIcon,
  GuarantorIcon,
  LoanIcon,
  MarketPlaceIcon,
  SavingsIcon,
  VotingIcon,
} from '@/assets/svgs';
import { DashboardConfig } from '@/types';
import React, { ReactNode } from 'react';
import {
  DASHBOARD_HOME_URL,
  GUARANTOR_URL,
  LOANS_URL,
  MARKET_URL,
  SAVINGS_URL,
  VOTING_URL,
} from './paths';

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
      href: DASHBOARD_HOME_URL,
      icon: <DashboardIcon />,
    },
    {
      title: 'Loans',
      href: LOANS_URL,
      icon: <LoanIcon />,
    },
    {
      title: 'Savings',
      href: SAVINGS_URL,
      icon: <SavingsIcon />,
    },
    {
      title: 'Guarantors',
      href: GUARANTOR_URL,
      icon: <GuarantorIcon />,
    },
    {
      title: 'Marketplace',
      href: MARKET_URL,
      icon: <MarketPlaceIcon />,
    },
    {
      title: 'Voting',
      href: VOTING_URL,
      icon: <VotingIcon />,
    },
  ],
};
