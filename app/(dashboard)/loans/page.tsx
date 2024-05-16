'use client';
import { tabs } from './data';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import TableTabs from '@/components/loan-table-tabs';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@/assets/svgs';

export default function Loans() {
  const searchParams = useSearchParams();
  const currentTab: string = searchParams.get('q') || tabs[0].title;
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-default font-semibold text-sm">Loans</h1>
        <Button className="space-x-2 lg:hidden flex">
          <p>New loan request</p> <ArrowRightIcon />
        </Button>
      </div>
      <div className="py-4 border border-light rounded-lg bg-white overflow-y-auto min-h-[800px]">
        <TableTabs currentTab={currentTab} tabs={tabs} />
      </div>
    </div>
  );
}
