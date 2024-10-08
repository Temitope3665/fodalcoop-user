'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@/assets/svgs';
import SavingTableTabs from '@/components/saving-deposit-tabs';
import SavingsDepositForm from '@/components/forms/savings-deposit-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Savings() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-default font-semibold text-sm">Savings</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="space-x-2 lg:hidden flex">
              <p>New targeted savings</p> <ArrowRightIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Savings deposit</SheetTitle>
              <SheetDescription className="pt-4 px-2 text-left">
                <SavingsDepositForm setOpen={setOpen} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="py-4 border border-light rounded-lg bg-white overflow-y-auto min-h-[800px]">
        <SavingTableTabs />
      </div>
    </div>
  );
}
