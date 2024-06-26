'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ActionIcon, ArrowRightIcon } from '@/assets/svgs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchInput from './ui/search-input';
import DataTable from './ui/data-table';
import { ILoanData, IRepaymentData } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import React, { ReactNode, useState } from 'react';
import LoanRequestForm from './forms/loans/loan-request-form';
import GuarantorForm from './forms/loans/guarantor-form';
import ReviewForm from './forms/loans/review-form';

interface ITableTabs {
  currentTab: string;
  tabs: {
    value: string;
    title: string;
    data: ILoanData[] | IRepaymentData[];
    columns: any;
  }[];
}

interface EachLoanRequestView {
  1: ReactNode;
  2: ReactNode;
  3: ReactNode;
}

export const TableTabs = ({ currentTab, tabs }: ITableTabs) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentFormView, setCurrentFormView] = useState<number>(1);

  const handleFilter = useDebouncedCallback((tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set('q', tab);
    } else {
      params.delete(tab || 'q');
    }
    replace(`${pathname}?${params.toString()}`);
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
    3: <ReviewForm setCurrentFormView={setCurrentFormView} />,
  };

  return (
    <Tabs
      defaultValue={currentTab}
      className="w-full"
      value={currentTab}
      onValueChange={(value) => handleFilter(value)}
    >
      <div className="lg:flex justify-between border-b pb-2 items-center pr-4">
        <TabsList className=" bg-white">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.title}
              role="button"
              className={cn(
                'w-fit text-xs text-[#666666] py-4 font-light space-x-2 border-light rounded-none px-4 flex items-center',
                currentTab === tab.title &&
                  'border-primary border-b-[1.5px] font-medium'
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="space-x-2 lg:flex hidden">
              <p>New loan request</p> <ArrowRightIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
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
      </div>
      <>
        {tabs.map((tab) => (
          <TabsContent
            value={tab.title}
            className="text-[#777777] text-sm font-light px-4 space-y-4"
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
              <DataTable
                data={tab.data}
                columns={tab.columns}
                dataSize={tab.data.length}
                pageSize={5}
              />
            </div>
          </TabsContent>
        ))}
      </>
    </Tabs>
  );
};

export default TableTabs;
