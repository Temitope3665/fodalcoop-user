'use client';
import { GuarantorIcon, LoanIcon, SavingsIcon } from '@/assets/svgs';
import useStore from '@/lib/use-store';
import { formatCurrency } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface IData {
  title: string;
  value: string;
  bgColor: string;
  color: string;
  icon: ReactNode;
}

export const DashboardCard = () => {
  const { user } = useStore();

  const data: IData[] = [
    {
      title: 'LOANS',
      value: `₦${formatCurrency(user?.member?.member_account?.loanBal || '0')}.00`,
      icon: <LoanIcon />,
      bgColor: '#EDF0FF',
      color: '#334DAA',
    },
    {
      title: 'SAVINGS',
      value: `₦${formatCurrency(user?.member.member_account.savingBal || '0')}.00`,
      icon: <SavingsIcon />,
      bgColor: '#E4FCEB',
      color: '#006A51',
    },
    {
      title: 'LIABILITY',
      value: `₦${formatCurrency(user?.member.member_account.liability || '0')}.00`,
      icon: <GuarantorIcon />,
      bgColor: '#FFDAEC',
      color: '#C52371',
    },
  ];
  return (
    <div className="grid lg:grid-cols-3 gap-4 overflow-y-auto">
      {data.map((each) => (
        <div
          className="p-4 rounded-lg space-y-10"
          style={{ background: each.bgColor, color: each.color }}
          key={each.title}
        >
          <div className="bg-white w-8 h-8 rounded-sm flex items-center justify-center">
            {each.icon}
          </div>
          <div className="">
            <h2 className="text-default font-semibold text-sm">{each.title}</h2>
            <h2 className="text-[20px] font-bold">{each.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
