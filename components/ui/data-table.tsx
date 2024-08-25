'use client';

import {
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import CustomPagination from './custom-pagination';
import EmptyComponent from '../empty';

interface DataTableProps {
  columns: any[];
  data: any[];
  handleClickRow?: (row: any) => void;
  headerClassName?: string;
  pageSize: number;
  dataSize: number;
}

const DataTable = ({
  columns,
  data,
  //   className,
  pageSize,
  dataSize,
  handleClickRow,
  headerClassName,
}: //   handleChangePageSize,
DataTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableGlobalFilter: true,
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <Table className="rounded-lg">
        <TableHeader className="overflow-hidden whitespace-nowrap text-ellipsis">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      headerClassName,
                      'bg-[#F4F7FF] py-4 text-default font-semibold text-xs'
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="h-[40vh]">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => (handleClickRow ? handleClickRow(row) : null)}
                className={cn(handleClickRow && 'cursor-pointer')}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="capitalize py-4 text-xs font-light text-[#444444]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                <EmptyComponent
                  title="No data found"
                  className="mt-0"
                  description="The selected data could not be found"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomPagination totalCount={dataSize} pageSize={pageSize} />
    </div>
  );
};

export default DataTable;
