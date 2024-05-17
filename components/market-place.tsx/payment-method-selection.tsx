'use client';
import { LoanIcon, PayWithLoanIcon, SavingsIcon } from '@/assets/svgs';
import { cn, formatStringWithCommas } from '@/lib/utils';
import { Check } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { duration } from '@/config/loan-config';
import SelectPaymentMethodForm from '../forms/select-payment-method-form';

interface IPaymentMethodSelection {
  totalCart: number;
}

const PaymentMethodSelection = ({ totalCart }: IPaymentMethodSelection) => {
  const [selectedMethod, setSelectedMethod] = useState<{
    title: string;
    icon: ReactNode;
    component: ReactNode;
  }>(paymentMethod(totalCart)[0]);
  return (
    <div className="col-span-6 bg-white border rounded-lg space-y-4 p-4 h-fit max-h-[90vh] overflow-y-auto">
      <h1 className="text-sm font-semibold">Select payment method</h1>
      <div className="grid grid-cols-3 gap-4 text-[#334DAA80]">
        {paymentMethod(totalCart).map((payment) => (
          <div
            className={cn(
              'bg-[#FAFAFA] rounded-sm p-4 trans text-[11px] border border-[#FAFAFA] font-light text-center space-y-3 relative',
              selectedMethod.title === payment.title &&
                'border-primary text-primary'
            )}
            key={payment.title}
            role="button"
            onClick={() => setSelectedMethod(payment)}
          >
            <div
              className={cn(
                'bg-primary w-4 h-4 rounded-full flex items-center justify-center absolute right-4',
                selectedMethod.title !== payment.title && 'opacity-35'
              )}
            >
              <Check className="text-white" size={18} />
            </div>
            {payment.icon}
            <p>{payment.title}</p>
          </div>
        ))}
      </div>
      {selectedMethod.component}

      <div className="space-x-4">
        <Button variant="outline" className="font-light w-[38%]">
          Cancel
        </Button>
        <Button className="font-light w-[58%]">
          Pay NGN {formatStringWithCommas(totalCart.toString())}.00
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;

const PayWithSavings = ({ totalCart }: { totalCart: number }) => {
  return (
    <React.Fragment>
      <div className="bg-[#FAFAFA] border border-[#F5F5F5] text-center py-4 rounded-sm">
        <p className="text-xs font-light">Savings Balance</p>
        <p className="font-semibold">₦ 12,000,000.00</p>
      </div>
      <div className="border border-[#F5F5F5] py-4 rounded-[5px] text-xs">
        <div className="flex justify-between border-b pb-4 border-[#F5F5F5]">
          <p className="px-4 font-light">Price</p>
          <p className="font-semibold px-4">
            {formatStringWithCommas(totalCart.toString())}.00
          </p>
        </div>
        <div className="flex justify-between py-4 border-[#F5F5F5]">
          <p className="px-4 font-light text-xs">Interest</p>
          <p className="font-semibold px-4">600.00</p>
        </div>
        <div className="flex justify-between border-t pt-4 border-[#F5F5F5]">
          <p className="px-4 font-bold text-xs">Total</p>
          <p className="font-bold text-sm px-4">
            {formatStringWithCommas(totalCart.toString())}.00
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const PayWithLoans = ({ totalCart }: { totalCart: number }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  return (
    <React.Fragment>
      <div className="space-y-1">
        <Label className="font-medium">Select loan duration</Label>
        <Select
          onValueChange={setSelectedDuration}
          defaultValue={selectedDuration}
        >
          <SelectTrigger className="text-xs text-[#888888] font-light">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent className="border-[#F5F5F5] text-xs text-[#888888]">
            {duration.map((each) => (
              <SelectItem value={each}>{each}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="border border-[#F5F5F5] py-4 rounded-[5px] text-xs">
        <div className="flex justify-between border-b pb-4 border-[#F5F5F5]">
          <p className="px-4 font-light">Price</p>
          <p className="font-semibold px-4">
            {formatStringWithCommas(totalCart.toString())}.00
          </p>
        </div>
        <div className="flex justify-between py-4 border-[#F5F5F5]">
          <p className="px-4 font-light text-xs">Interest</p>
          <p className="font-semibold px-4">600.00</p>
        </div>
        <div className="flex justify-between border-t pt-4 border-[#F5F5F5]">
          <p className="px-4 font-bold text-xs">Total</p>
          <p className="font-bold text-sm px-4">
            {formatStringWithCommas(totalCart.toString())}.00
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const paymentMethod = (
  totalCart: number
): { title: string; icon: ReactNode; component: ReactNode }[] => [
  {
    title: 'Pay from savings',
    icon: <SavingsIcon className="w-5 h-5 mx-auto" />,
    component: <PayWithSavings totalCart={totalCart} />,
  },
  {
    title: 'Pay with loan',
    icon: <PayWithLoanIcon className="mx-auto" />,
    component: <PayWithLoans totalCart={totalCart} />,
  },
  {
    title: 'Outright purchase',
    icon: <LoanIcon className="w-5 h-5 mx-auto" />,
    component: <SelectPaymentMethodForm />,
  },
];
