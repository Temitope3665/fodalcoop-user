'use client';
import React from 'react';
import { Button } from './button';
import { DOTS, usePagination } from '@/hooks/usePagination';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface CustomPaginationProps {
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  handleChangePageSize?: (value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalCount,
  siblingCount = 1,
  pageSize,
  handleChangePageSize,
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('p')) || 1;

  const onPageChange = (page: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (page) {
      params.set('p', page.toString());
    } else {
      params.delete('p');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleValueChange = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.delete('p');
    replace(`${pathname}?${params.toString()}`);
    handleChangePageSize?.(value);
  };

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 1) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  const rowNumber = [10, 20, 30, 40, 50];

  return (
    <div className="flex items-center justify-between space-x-2 py-4 px-4 border-t w-full bg-[#F8F9FD]">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="text-sm font-light"
      >
        Previous
      </Button>

      <div className="flex items-center">
        {paginationRange.map((pageNumber: any) => {
          return (
            <button
              key={pageNumber}
              className={cn(
                'px-1 lg:px-4 lg:py-2 text-[12px] lg:text-sm',
                pageNumber === currentPage
                  ? 'active bg-[#EEF0F9] text-primary rounded-sm lg:rounded-lg'
                  : 'text-grey-500'
              )}
              onClick={() =>
                pageNumber === DOTS ? null : onPageChange(pageNumber)
              }
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={currentPage === lastPage}
        className="text-sm font-light"
      >
        Next
      </Button>
    </div>
  );
};

export default CustomPagination;
