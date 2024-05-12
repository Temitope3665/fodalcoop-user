import { GuarantorIcon, LoanIcon, SavingsIcon } from '@/assets/svgs';
import React, { ReactNode } from 'react';

interface IData {
  title: string;
  value: string;
  bgColor: string;
  color: string;
  icon: ReactNode;
}

export const DashboardCard = ({ data }: { data: IData }) => {
  return (
    <div
      className="p-4 rounded-lg space-y-10"
      style={{ background: data.bgColor, color: data.color }}
    >
      <div className="bg-white w-8 h-8 rounded-sm flex items-center justify-center">
        {data.icon}
      </div>
      <div className="">
        <h2 className="text-default font-semibold text-sm">{data.title}</h2>
        <h2 className="text-[20px] font-bold">{data.value}</h2>
      </div>
    </div>
  );
};

export const cardData: IData[] = [
  {
    title: 'LOANS',
    value: '150,235.00',
    icon: <LoanIcon />,
    bgColor: '#EDF0FF',
    color: '#334DAA',
  },
  {
    title: 'SAVINGS',
    value: '150,235.00',
    icon: <SavingsIcon />,
    bgColor: '#E4FCEB',
    color: '#006A51',
  },
  {
    title: 'GUARANTOR',
    value: '0.00',
    icon: <GuarantorIcon />,
    bgColor: '#FFDAEC',
    color: '#C52371',
  },
];
