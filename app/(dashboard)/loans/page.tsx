'use client';
import { tabs } from './data';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import TableTabs from '@/components/table-tabs';

export default function Loans() {
  const searchParams = useSearchParams();
  const currentTab: string = searchParams.get('q') || tabs[0].title;
  return (
    <div className="px-4 py-2 space-y-4">
      <h1 className="text-default font-semibold text-sm">Loans</h1>
      <div className="py-4 border border-light rounded-lg bg-white overflow-y-auto min-h-[800px]">
        <TableTabs currentTab={currentTab} tabs={tabs} />
      </div>
    </div>
  );
}
