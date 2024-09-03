import { Checkbox } from '@/components/ui/checkbox';

import { Eye, HandCoins, Trash2 } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LoanRepaymentForm from '@/components/forms/loans/loan-repayment-form';
import ReviewForm from '@/components/forms/loans/review-form';
import RepayReviewForm from '@/components/forms/loans/repay-review-form';
import useStore from '@/lib/use-store';

interface EachStatus {
  Active: ReactNode;
  Declined: ReactNode;
  Pending: ReactNode;
}

interface RowData {
  status: keyof EachStatus;
  // Add other properties of row.original here
}

export const columns: {
  accessorKey: string;
  header: any;
  key: string;
  cell?: any;
}[] = [
  // {
  //   accessorKey: 'select',
  //   header: ({ table }: any) => {
  //     return (
  //       <div className="flex items-center space-x-2">
  //         <Checkbox
  //           id="selectAll"
  //           aria-label="Select all"
  //           className="translate-y-[2px]"
  //           checked={
  //             table.getIsAllPageRowsSelected() ||
  //             (table.getIsSomePageRowsSelected() && 'indeterminate')
  //           }
  //           onCheckedChange={(value) =>
  //             table.toggleAllPageRowsSelected(!!value)
  //           }
  //         />
  //       </div>
  //     );
  //   },
  //   key: 'select',
  //   cell: ({ row }: any) => (
  //     <div className="flex items-center space-x-2">
  //       <Checkbox
  //         id="selectAll"
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //         className="translate-y-[2px]"
  //       />
  //     </div>
  //   ),
  // },
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
    header: 'Month Repay (₦)',
    key: 'monthly_repay',
    cell: ({ row }: any) => {
      const { monthly_repay } = row.original;
      return <p className="">{monthly_repay}</p>;
    },
  },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    key: 'start_date',
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
  const [openRepayment, setOpenRepayment] = useState(false);
  const [currentReviewView, setCurrentReviewView] = useState<number>(1);
  const setCurrentLoanRepayment = useStore(
    (state) => state.setCurrentLoanRepayment
  );
  // const [openConfirmDialog, setConfirmDialog] = useState(false);

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
    interest_bal,
    interest_paid,
  } = row.original;

  const reviewView: any = {
    1: (
      <LoanRepaymentForm
        setCurrentFormView={setCurrentReviewView}
        setOpen={setOpenRepayment}
        loan={row.original}
      />
    ),
    2: (
      <RepayReviewForm
        setCurrentFormView={setCurrentReviewView}
        setOpenSheet={setOpenRepayment}
        loan={row.original}
      />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loan Details</DialogTitle>
            <DialogDescription>View loan details below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-6">
              <p>ID:</p>
              <p>{id}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Loan:</p>
              <p>{totalLoan}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Balance:</p>
              <p>{total_bal}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Total Paid:</p>
              <p>{total_paid}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Monthly Repayment:</p>
              <p>{monthly_repay}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal:</p>
              <p>{principal}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal Balance:</p>
              <p>{principal_bal}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Principal Paid:</p>
              <p>{principal_paid}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest:</p>
              <p>{loan_product.interest}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest Balance:</p>
              <p>{interest_bal}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>Interest Paid:</p>
              <p>{interest_paid}</p>
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
              <p>{start_date}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <p>End date:</p>
              <p>{end_date}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div
        className="hover:bg-[#E8F9FF] p-2 rounded-full"
        role="button"
        onClick={() => setOpenRepayment(true)}
      >
        <HandCoins size={18} strokeWidth={1} />
      </div>

      <Sheet open={openRepayment} onOpenChange={setOpenRepayment}>
        <SheetContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <SheetHeader>
            <SheetTitle className="-space-y-1">
              <h1>Repay Loan</h1>
              <p className="text-[13px] font-light text-[#666666]">
                Complete the form to make a loan repayment
              </p>
            </SheetTitle>
            <SheetDescription className="pt-4 h-[89vh] overflow-y-auto px-2">
              {reviewView[currentReviewView]}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
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
    Running: (
      <div className="text-white bg-primary w-fit rounded-lg px-4 py-1">
        Running
      </div>
    ),
  };
  return <div>{eachStatus[status]}</div>;
};
