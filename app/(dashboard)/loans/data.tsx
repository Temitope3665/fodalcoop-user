import { IApplicationData, ILoanData, IRepaymentData } from '@/types';
import { columns } from './column/loan-column';
import { repaymentColumns } from './column/repayment-column';
import { applicationColumns } from './column/applications-column';

export const loanData: ILoanData[] = [
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Canceled',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
];

export const repaymentData: IRepaymentData[] = [
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    paymentMethod: 'Cheque',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    paymentMethod: 'USSD',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    paymentMethod: 'Transfer',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    paymentMethod: 'Cash',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    paymentMethod: 'Cheque',
    status: 'Canceled',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    paymentMethod: 'Cheque',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
];

export const applicationsData: IApplicationData[] = [
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    loanType: 'Cash Loan',
    loanProduct: '6 months',
    month: 'Feb',
    paymentMethod: 'Cheque',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    loanType: 'Mortgage Loan',
    loanProduct: 'Standard',
    month: 'Feb',
    paymentMethod: 'USSD',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    loanType: 'Capital Loan',
    loanProduct: '6 months',
    month: 'Feb',
    paymentMethod: 'Transfer',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    loanType: 'Grants',
    loanProduct: 'Land',
    month: 'Feb',
    paymentMethod: 'Cash',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    loanType: 'Cash Loan',
    loanProduct: '6 months',
    month: 'Feb',
    paymentMethod: 'Cheque',
    status: 'Canceled',
    date: 'Feb 25, 2023',
  },
  {
    loanID: 'L12345678',
    amount: '5,400,000.00',
    loanType: 'Cash Loan',
    loanProduct: '6 months',
    month: 'Feb',
    paymentMethod: 'Cheque',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
];

export const tabs: {
  title: string;
  value: string;
  data: ILoanData[] | IRepaymentData[] | IApplicationData[];
  columns: any;
}[] = [
  {
    title: 'Loan',
    value: '24',
    data: loanData,
    columns: columns,
  },
  {
    title: 'Repayment',
    value: '24',
    data: repaymentData,
    columns: repaymentColumns,
  },
  {
    title: 'Applications',
    value: '4',
    data: applicationsData,
    columns: applicationColumns,
  },
];
