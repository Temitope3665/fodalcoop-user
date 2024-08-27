'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ActionIcon, ArrowRightIcon } from '@/assets/svgs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchInput from './ui/search-input';
import DataTable from './ui/data-table';
import { IStandardSavingsData } from '@/types';
import React from 'react';
import SavingsDepositForm from './forms/savings-deposit-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { columns } from '@/app/(dashboard)/savings/column/standard-savings-column';
import { useQuery } from '@tanstack/react-query';
import { getDepositLogs, getStandardSavings } from '@/config/apis/savings';
import { SAVINGS_EP, TARGET_SAVINGS_EP } from '@/config/endpoints';
import {
  DEPOSIT_LOG_KEY,
  STANDARD_SAVINGS_KEY,
  TARGETED_SAVINGS_KEY,
} from '@/lib/query-keys';
import { TableSkeleton } from './loaders';
import { logColumns } from '@/app/(dashboard)/savings/column/deposit-log-columns';

export const SavingTableTabs = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState<boolean>(false);
  const currentTab = searchParams.get('tab') || 'deposit-logs';

  const handleFilter = useDebouncedCallback((tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab) {
      params.set('tab', tab);
    } else {
      params.delete(tab);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getStandardSavings(SAVINGS_EP),
    queryKey: [STANDARD_SAVINGS_KEY],
  });

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
    error: error2,
  } = useQuery({
    queryFn: () => getStandardSavings(TARGET_SAVINGS_EP),
    queryKey: [TARGETED_SAVINGS_KEY],
  });

  const {
    data: data3,
    isLoading: isLoading3,
    isError: isError3,
    error: error3,
  } = useQuery({
    queryFn: getDepositLogs,
    queryKey: [DEPOSIT_LOG_KEY],
  });

  const records = data?.data || [];
  const records2 = data2?.data || [];
  const records3 = data3 || [];

  console.log(data3);

  const tabs: {
    title: string;
    value: number | string | undefined;
    data: IStandardSavingsData[];
    columns: any;
    endpoint: string;
  }[] = [
    {
      title: 'Deposit Logs',
      endpoint: 'deposit-logs',
      value: records3 && records3?.length,
      data: records3,
      columns: logColumns,
    },
    {
      title: 'Targeted savings',
      value: records2 && records2?.length,
      endpoint: 'target-savings',
      data: records2,
      columns: columns,
    },
    {
      title: 'Standard savings',
      endpoint: 'standard-savings',
      value: records && records?.length,
      data: records,
      columns: columns,
    },
  ];

  if (isError || isError2 || isError3) {
    throw new Error(error?.message || error2?.message || error3?.message);
  }

  return (
    <Tabs
      defaultValue={currentTab}
      className="w-full px-4"
      value={currentTab}
      onValueChange={(value) => handleFilter(value)}
    >
      <div className="lg:flex justify-between py-1 items-center">
        <TabsList className=" bg-white">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.title}
              value={tab.endpoint}
              role="button"
              className={cn(
                'w-fit text-xs text-[#666666] py-1 font-light space-x-2'
              )}
            >
              <p>{tab.title}</p>
              <div
                className={cn(
                  'rounded-sm w-6 h-6 flex bg-[#F0F0F0] text-[#888888] items-center justify-center',
                  currentTab === tab.endpoint && 'bg-[#EEF0F9] text-primary'
                )}
              >
                {tab.value}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="lg:flex hidden">
              <p>New saving deposit</p> <ArrowRightIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="-space-y-1">
                <h1>Savings deposit</h1>
              </SheetTitle>
              <SheetDescription className="pt-4 px-2 text-left">
                <SavingsDepositForm setOpen={setOpen} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <>
        {tabs.map((tab) => (
          <TabsContent
            value={tab.endpoint}
            className="text-[#777777] text-sm font-light space-y-4"
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
              {isLoading || isLoading2 || isLoading3 ? (
                <TableSkeleton />
              ) : (
                <DataTable
                  data={tab.data}
                  columns={tab.columns}
                  dataSize={tab.data.length}
                  pageSize={5}
                />
              )}
            </div>
          </TabsContent>
        ))}
      </>
    </Tabs>
  );
};

export default SavingTableTabs;
