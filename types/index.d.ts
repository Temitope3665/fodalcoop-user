import { User } from '@prisma/client';
import type { Icon } from 'lucide-react';

import { Icons } from '@/components/icons';
import { loanFormSchema } from '@/components/forms/loans/request-form/loan-request-form';

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
  disabled: boolean;
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
    member_account: {
      liability: string;
      loanBal: string;
      savingBal: string;
    };
  };
}

export interface IBank {
  id: number;
  bank_id: number;
  accountName: string;
  accountNumber: number;
  bank_list: { name: string; id: number };
}

export const additionalSchema = z.object({
  id: z.number(),
  loan_id: z.number().nullable(),
  member_id: z.number(),
  total_loan_amount: z.string(),
  amount_request: z.string(),
  amount_approved: z.string().nullable(),
  grant: z.string(),
  grant_by: z.string().nullable(),
  completed_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  loan_guarantor: z.array(
    z.object({
      id: z.number(),
      loan_id: z.number().nullable(),
      guarantor: z.number(),
      liability: z.string(),
      liability_accepted: z.string().nullable(),
      status: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      main_gaurantor_id: z.number(),
      member: z.object({
        id: z.number(),
        user_id: z.number(),
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        email: z.string(),
        nin: z.string(),
        agency_id: z.number(),
        officeAddress: z.string(),
        residentialAddress: z.string(),
        dob: z.string(),
        doe: z.string(),
        dom: z.string(),
        nokName: z.string(),
        nokTel: z.string(),
        nokRel: z.string(),
        nokAddress: z.string(),
        image_path: z.string(),
        member_status_id: z.number(),
        old_id: z.number().nullable(),
        approved_at: z.string(),
        approved_by: z.number(),
        created_by: z.number().nullable(),
        deleted_at: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string(),
        member_schedule_status_id: z.number().nullable(),
        self_update_status: z.number().nullable(),
      }),
    })
  ),
});

export const extendedLoanFormSchema = loanFormSchema.merge(additionalSchema);

export interface ILoanRoute {
  setIsRouting: (arg: boolean) => void;
  setCurrentLoanCreation: any;
  setCurrentFormView: (arg: number) => void;
  data: any;
}

export interface ILoanRequestAction {
  setIsRouting: (arg: boolean) => void;
  setCurrentLoanCreation: any;
  setCurrentFormView: (arg: number) => void;
  data: any;
  totalLoan: number | null;
  customPayment: any;
  watchDocuments: any[];
  watchCapitalLoanProduct: any[];
}
