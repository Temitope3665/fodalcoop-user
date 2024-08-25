'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { tabs } from './data';
import GuarantorTableTabs from '@/components/guarantor-tabs';

export default function Guarantors() {
  const searchParams = useSearchParams();
  const currentTab: string = searchParams.get('q') || tabs[0].title;
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-default font-semibold text-sm">Guarantor</h1>
      </div>
      <div className="py-4 border border-light rounded-lg bg-white overflow-y-auto min-h-[800px]">
        <GuarantorTableTabs currentTab={currentTab} tabs={tabs} />
      </div>
    </div>
  );
}
