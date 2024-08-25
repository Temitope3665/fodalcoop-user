'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ActionIcon } from '@/assets/svgs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import SearchInput from './ui/search-input';
import DataTable from './ui/data-table';
import { IGuarantorData } from '@/types';
import React from 'react';

interface ITableTabs {
  currentTab: string;
  tabs: {
    value: string;
    title: string;
    data: IGuarantorData[];
    columns: any;
  }[];
}

export const GuarantorTableTabs = ({ currentTab, tabs }: ITableTabs) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <Tabs
      defaultValue={currentTab}
      className="w-full"
      value={currentTab}
      onValueChange={(value) => handleFilter(value)}
    >
      <TabsList className=" bg-white w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.title}
            role="button"
            className={cn(
              'w-full text-xs text-[#666666] py-1 font-light space-x-2'
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

export default GuarantorTableTabs;
