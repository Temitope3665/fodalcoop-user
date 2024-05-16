import { IStandardSavingsData } from '@/types';
import { columns } from './column/standard-savings-column';

export const standardSavingsData: IStandardSavingsData[] = [
  {
    transactionID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    transactionID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    transactionID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
  {
    transactionID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Active',
    date: 'Feb 25, 2023',
  },
  {
    transactionID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Canceled',
    date: 'Feb 25, 2023',
  },
  {
    transactionID: 'L12345678',
    amount: '5,400,000.00',
    month: 'Feb',
    source: 'Cooperative',
    oldBalance: '250,000.00',
    newBalance: '5,650,000.00',
    status: 'Pending',
    date: 'Feb 25, 2023',
  },
];

export const tabs: {
  title: string;
  value: string;
  data: IStandardSavingsData[];
  columns: any;
}[] = [
  {
    title: 'Standard savings',
    value: '24',
    data: standardSavingsData,
    columns: columns,
  },
  {
    title: 'Targeted savings',
    value: '24',
    data: standardSavingsData,
    columns: columns,
  },
  {
    title: 'Deposit request',
    value: '24',
    data: standardSavingsData,
    columns: columns,
  },
];
