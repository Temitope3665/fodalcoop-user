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

export type ILoanData = {
  loanID: string;
  amount: string;
  month: string;
  source: string;
  oldBalance: string;
  newBalance: string;
  status: string;
  date: string;
};

export type IStandardSavingsData = {
  transactionID: string;
  amount: string;
  month: string;
  source: string;
  oldBalance: string;
  newBalance: string;
  status: string;
  date: string;
};

export type IRepaymentData = {
  loanID: string;
  amount: string;
  month: string;
  paymentMethod: string;
  status: string;
  date: string;
};

export type IApplicationData = {
  loanID: string;
  amount: string;
  loanType: string;
  loanProduct: string;
  month: string;
  paymentMethod: string;
  status: string;
  date: string;
};
