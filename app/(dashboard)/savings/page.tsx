'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@/assets/svgs';
import { tabs } from './data';
import SavingTableTabs from '@/components/saving-deposit-tabs';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import SavingsDepositForm from '@/components/forms/savings-deposit-form';

export default function Savings() {
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState<boolean>(false);
  const currentTab: string = searchParams.get('q') || tabs[0].title;
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-default font-semibold text-sm">Savings</h1>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button className="space-x-2 lg:hidden flex">
              <p>New targeted savings</p> <ArrowRightIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="-space-y-1">
                <h1>Savings deposit</h1>
              </AlertDialogTitle>
              <AlertDialogDescription className="pt-4 px-2 text-left">
                <SavingsDepositForm setOpen={setOpen} />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="py-4 border border-light rounded-lg bg-white overflow-y-auto min-h-[800px]">
        <SavingTableTabs currentTab={currentTab} tabs={tabs} />
      </div>
    </div>
  );
}
