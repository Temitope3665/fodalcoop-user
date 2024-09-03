'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ActionIcon, ArrowRightIcon } from '@/assets/svgs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchInput from './ui/search-input';
import DataTable from './ui/data-table';
import { IApplicationData, ILoanData, IRepaymentData } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React, { useState } from 'react';
import LoanRequestForm from './forms/loans/loan-request-form';
import GuarantorForm from './forms/loans/guarantor-form';
import ReviewForm from './forms/loans/review-form';
import { columns } from '@/app/(dashboard)/loans/column/loan-column';
import { repaymentColumns } from '@/app/(dashboard)/loans/column/repayment-column';
import { useQuery } from '@tanstack/react-query';
import {
  getLoanApplications,
  getRepaymentRecord,
  getRunningLoans,
} from '@/config/apis/loans';
import {
  LOAN_APPLICATIONS_KEY,
  REPAYMENT_LOAN_KEY,
  RUNNING_LOAN_KEY,
} from '@/lib/query-keys';
import { TableSkeleton } from './loaders';
import { applicationColumns } from '@/app/(dashboard)/loans/column/applications-column';
import LoanRepaymentForm from './forms/loans/loan-repayment-form';

export const TableTabs = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentTab: string = searchParams.get('tab') || 'Loan';
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentFormView, setCurrentFormView] = useState<number>(1);

  const handleFilter = useDebouncedCallback((tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set('tab', tab);
    } else {
      params.delete(tab || 'tab');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

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
    3: (
      <ReviewForm
        setCurrentFormView={setCurrentFormView}
        setOpenSheet={setOpen}
      />
    ),
  };

  const { data, isLoading, isError, error } = useQuery({
    queryFn: getRunningLoans,
    queryKey: [RUNNING_LOAN_KEY],
  });

  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useQuery({
    queryFn: getRepaymentRecord,
    queryKey: [REPAYMENT_LOAN_KEY],
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useQuery({
    queryFn: getLoanApplications,
    queryKey: [LOAN_APPLICATIONS_KEY],
  });

  const loans = data || [];
  const repayments = data1?.data || [];
  const applications = data2?.data || [];

  console.log(applications, '-> applications');

  const tabs: {
    title: string;
    value: number;
    data: ILoanData[] | IRepaymentData[] | IApplicationData[];
    columns: any;
  }[] = [
    {
      title: 'Loan',
      value: loans && loans?.length,
      data: loans,
      columns: columns,
    },
    {
      title: 'Repayment',
      value: repayments && repayments?.length,
      data: repayments,
      columns: repaymentColumns,
    },
    {
      title: 'Applications',
      value: applications && applications.length,
      data: applications,
      columns: applicationColumns,
    },
  ];

  if (isError || isError1 || isError2) {
    throw new Error(error?.message || error1?.message || error2?.message);
  }

  return (
    <Tabs
      defaultValue={currentTab}
      className="w-full"
      value={currentTab}
      onValueChange={(value) => handleFilter(value)}
    >
      <div className="lg:flex justify-between py-1 items-center pr-4">
        <TabsList className="bg-white">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.title}
              value={tab.title}
              role="button"
              className={cn(
                'w-fit text-xs text-[#666666] py-1 font-light space-x-2'
              )}
            >
              <p>{tab.title}</p>
              <div
                className={cn(
                  'rounded-sm w-6 h-6 flex bg-[#F0F0F0] text-[#888888] items-center justify-center',
                  currentTab === tab.title && 'bg-[#EEF0F9] text-primary'
                )}
              >
                {tab.value}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <Button
          className="space-x-2 lg:flex hidden"
          onClick={() => setOpen(true)}
        >
          <p>New Loan Request</p> <ArrowRightIcon />
        </Button>
      </div>
      <>
        {tabs.map((tab) => (
          <TabsContent
            value={tab.title}
            className="text-[#777777] text-sm font-light px-4 space-y-4"
            key={tab.title}
          >
            <div className="flex justify-between items-center py-2 w-full">
              <div className="flex items-center space-x-4">
                <div
                  className="flex spaxe-x-2 items-center text-xs rounded-2xl px-3 py-1.5 border border-[#E1E1E1]"
                  role="button"
                >
                  <ActionIcon />
                  <p>Action</p>
                </div>
                <div
                  className="flex spaxe-x-2 items-center text-xs rounded-2xl px-3 py-1.5 border border-[#E1E1E1]"
                  role="button"
                >
                  <ActionIcon />
                  <p>Action</p>
                </div>
              </div>
              <div className="w-[25%]">
                <SearchInput placeholder="Search" />
              </div>
            </div>

            <div className="">
              {isLoading || isLoading1 || isLoading2 ? (
                <TableSkeleton />
              ) : (
                <DataTable
                  data={tab.data}
                  columns={tab.columns}
                  dataSize={tab.data.length}
                  pageSize={10}
                />
              )}
            </div>
          </TabsContent>
        ))}
      </>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <SheetHeader>
            <SheetTitle className="-space-y-1">
              <h1>New Loan Request</h1>
              <p className="text-[13px] font-light text-[#666666]">
                Complete the form to make a loan request
              </p>
            </SheetTitle>
            <SheetDescription className="pt-4 h-[89vh] overflow-y-auto px-2">
              {eachView[currentFormView]}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Tabs>
  );
};

export default TableTabs;
