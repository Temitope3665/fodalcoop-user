import { Eye } from 'lucide-react';
import { ReactNode, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { formatCurrency, formatDate2 } from '@/lib/utils';

export const applicationColumns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  {
    accessorKey: 'id',
    header: 'Loan ID',
    key: 'id',
    cell: ({ row }: any) => {
      const { id } = row.original;
      return <p className="">{id}</p>;
    },
  },
  {
    accessorKey: 'totalLoan',
    header: 'Total Loan (₦)',
    key: 'totalLoan',
    cell: ({ row }: any) => {
      const { totalLoan } = row.original;
      return <p className="">{formatCurrency(totalLoan)}</p>;
    },
  },
  {
    accessorKey: 'total_paid',
    header: 'Total Paid (₦)',
    key: 'total_paid',
    cell: ({ row }: any) => {
      const { total_paid } = row.original;
      return <p className="">{formatCurrency(total_paid)}</p>;
    },
  },
  {
    accessorKey: 'total_bal',
    header: 'Total Balance (₦)',
    key: 'total_bal',
    cell: ({ row }: any) => {
      const { total_bal } = row.original;
      return <p className="">{formatCurrency(total_bal)}</p>;
    },
  },
  {
    accessorKey: 'monthly_repay',
    header: 'Monthly Repay (₦)',
    key: 'monthly_repay',
    cell: ({ row }: any) => {
      const { monthly_repay } = row.original;
      return <p className="">{monthly_repay || 'N/A'}</p>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    key: 'status',
    cell: ({ row }: any) => <StatusCell row={row} />,
  },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    key: 'start_date',
    cell: ({ row }: any) => (
      <p>{row.original.start_date || formatDate2(row.original.created_at)}</p>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    key: 'action',
    cell: ({ row }: any) => <LoanActionCell row={row} />,
  },
];

export const LoanActionCell = ({ row }: any) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const {
    id,
    totalLoan,
    total_bal,
    total_paid,
    monthly_repay,
    principal,
    principal_bal,
    principal_paid,
    start_date,
    end_date,
    loan_product,
    loan_status,
    interest_bal,
    interest_paid,
    created_at,
  } = row.original;

  const eachStatus: Record<typeof status, JSX.Element> = {
    Approved: (
      <div className="text-[#25D366] bg-[#25D3661A] w-fit rounded-lg px-4 py-1">
        Approved
      </div>
    ),
    Declined: (
      <div className="text-[#DE1D3E] bg-[#F8D2D81A] w-fit rounded-lg px-4 py-1">
        Declined
      </div>
    ),
    Pending: (
      <div className="text-[#000] bg-[#FFC107] w-fit rounded-lg px-4 py-1">
        Pending
      </div>
    ),
    Running: (
      <div className="text-white bg-primary w-fit rounded-lg px-4 py-1">
        Running
      </div>
    ),
  };
  return (
    <div className="flex items-center">
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <div className="hover:bg-[#E8F9FF] p-2 rounded-full" role="button">
            <Eye className="" size={18} strokeWidth={1} />
          </div>
        </DialogTrigger>
        <DialogContent className="space-y-2">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-6">
              <p>ID:</p>
              <p>{id}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Loan:</p>
              <p>₦{formatCurrency(totalLoan)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Balance:</p>
              <p>{formatCurrency(total_bal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Paid:</p>
              <p>{formatCurrency(total_paid)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Monthly Repayment:</p>
              <p>{formatCurrency(monthly_repay) || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal:</p>
              <p>₦{formatCurrency(principal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal Balance:</p>
              <p>₦{formatCurrency(principal_bal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal Paid:</p>
              <p>₦{formatCurrency(principal_paid)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest:</p>
              <p>{formatCurrency(loan_product.interest)}%</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest Balance:</p>
              <p>₦{formatCurrency(interest_bal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest Paid:</p>
              <p>₦{formatCurrency(interest_paid)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Name:</p>
              <p>{loan_product.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <p>Duration:</p>
              <p>{loan_product.duration}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Start date:</p>
              <p>{start_date || formatDate2(created_at)}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>End date:</p>
              <p>{end_date || 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Status:</p>
              <p>{eachStatus[loan_status.name]}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const StatusCell = ({ row }: any) => {
  const { loan_status } = row.original;
  const status = loan_status.name;

  const eachStatus: Record<typeof status, JSX.Element> = {
    Approved: (
      <div className="text-[#25D366] bg-[#25D3661A] w-fit rounded-lg px-4 py-1">
        Approved
      </div>
    ),
    Declined: (
      <div className="text-[#DE1D3E] bg-[#F8D2D81A] w-fit rounded-lg px-4 py-1">
        Declined
      </div>
    ),
    Pending: (
      <div className="text-[#000] bg-[#FFC107] w-fit rounded-lg px-4 py-1">
        Pending
      </div>
    ),
    Running: (
      <div className="text-white bg-primary w-fit rounded-lg px-4 py-1">
        Running
      </div>
    ),
  };
  return <div>{eachStatus[status]}</div>;
};
