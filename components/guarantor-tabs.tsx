'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ActionIcon } from '@/assets/svgs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchInput from './ui/search-input';
import DataTable from './ui/data-table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGuarantors } from '@/config/apis/guarantor';
import {
  INCOMING_GUARANTOR_KEY,
  OUTGOING_GUARANTOR_KEY,
} from '@/lib/query-keys';
import { IGuarantorData } from '@/types';
import { columns } from '@/app/(dashboard)/guarantors/column';
import { TableSkeleton } from './loaders';

export const GuarantorTableTabs = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'incoming';

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
    queryFn: () => getGuarantors('incoming'),
    queryKey: [INCOMING_GUARANTOR_KEY],
    enabled: currentTab === 'incoming',
  });

  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
  } = useQuery({
    queryFn: () => getGuarantors('outgoing'),
    queryKey: [OUTGOING_GUARANTOR_KEY],
    enabled: currentTab === 'outgoing',
  });

  const incoming = data?.data || [];
  const outgoing = data1?.data || [];

  const tabs: {
    value: string | number;
    type: string;
    data: IGuarantorData[];
    columns: any;
  }[] = [
    {
      type: 'incoming',
      value: incoming.length,
      data: incoming,
      columns: columns,
    },
    {
      type: 'outgoing',
      value: outgoing.length,
      data: outgoing,
      columns: columns,
    },
  ];

  if (isError || isError1) {
    throw new Error(error?.message || error1?.message);
  }

  return (
    <Tabs
      defaultValue={currentTab}
      className="w-full px-4"
      value={currentTab}
      onValueChange={(value) => handleFilter(value)}
    >
      <TabsList className=" bg-white w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.type}
            value={tab.type}
            role="button"
            className={cn(
              'w-fit text-xs text-[#666666] py-1 font-light space-x-2'
            )}
          >
            <p className="capitalize">{tab.type}</p>
            <div
              className={cn(
                'rounded-sm w-6 h-6 flex bg-[#F0F0F0] text-[#888888] items-center justify-center',
                currentTab === tab.type && 'bg-[#EEF0F9] text-primary'
              )}
            >
              {tab.value}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      <>
        {tabs.map((tab) => (
          <TabsContent
            value={tab.type}
            className="text-[#777777] text-sm font-light space-y-4"
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
              {isLoading || isLoading1 ? (
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

export default GuarantorTableTabs;
