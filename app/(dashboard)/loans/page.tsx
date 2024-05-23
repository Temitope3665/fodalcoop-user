'use client';
import { tabs } from './data';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import TableTabs from '@/components/loan-table-tabs';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@/assets/svgs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LoanRequestForm from '@/components/forms/loans/loan-request-form';
import GuarantorForm from '@/components/forms/loans/guarantor-form';
import ReviewForm from '@/components/forms/loans/review-form';

export default function Loans() {
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState<boolean>(false);
  const currentTab: string = searchParams.get('q') || tabs[0].title;
  const [currentFormView, setCurrentFormView] = React.useState<number>(1);

  const eachView: any = {
    1: (
      <LoanRequestForm
        setOpen={setOpen}
        setCurrentFormView={setCurrentFormView}
      />
    ),
    2: (
      <GuarantorForm
        setOpen={setOpen}
        setCurrentFormView={setCurrentFormView}
      />
    ),
    3: <ReviewForm setCurrentFormView={setCurrentFormView} />,
  };

  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-default font-semibold text-sm">Loans</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="space-x-2 lg:hidden flex">
              <p>New loan request</p> <ArrowRightIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle className="-space-y-1">
                <h1>New Loan Request</h1>
                <p className="text-[13px] font-light text-[#666666]">
                  Complete the form to make a loan request
                </p>
              </SheetTitle>
              <SheetDescription className="pt-4 lg:h-[89vh] overflow-y-auto px-2 h-[60vh] text-left">
                {eachView[currentFormView]}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="py-4 border border-light rounded-lg bg-white overflow-y-auto min-h-[800px]">
        <TableTabs currentTab={currentTab} tabs={tabs} />
      </div>
    </div>
  );
}
