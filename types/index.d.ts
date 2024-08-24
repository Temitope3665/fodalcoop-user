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

export type IGuarantorData = {
  sender: string;
  liability: string;
  phone: string;
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

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface IDefaultUser {
  firstName: string;
  lastName: string;
  email: string;
  residential: string;
  offAddress: string;
  dob: string;
  doe: string;
  nokName: string;
  nokRel: string;
  nokTel: string;
  nokAddress: string;
  image: string | any;
  agency: string;
  phone: string;
}

export interface IMessageResponse {
  subject: string;
  body: string;
  sent_on: string;
  message_status: { name: string };
  id: number;
  replyId: string;
  file_path: string;
  isView?: boolean;
}

export interface IUser {
  email: string;
  id: string;
  member: {
    lastName: string;
    firstName: string;
    id: string | number;
    email: string;
    phone: string;
    residentialAddress: string;
    agency_id: string;
  };
}
