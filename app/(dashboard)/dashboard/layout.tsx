import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-9 h-full">
      <div className="lg:col-span-7 h-[94vh] overflow-y-auto px-4 py-2">
        {children}
      </div>
      <div className="lg:col-span-2 bg-white px-4 py-2 h-[94vh] overflow-y-auto">
        <div className="space-y-2">
          <h1 className="text-default font-semibold text-sm">Messages</h1>
          <Separator />
        </div>
        {messages.map((message, index) => (
          <React.Fragment key={`${message}-${index}`}>
            <div className="space-y-2 py-2">
              <div className="space-y-1">
                <h1 className={cn('text-default font-light text-sm')}>
                  {message.title}
                </h1>
                <p className="text-default font-light text-[10px]">
                  {message.date}
                </p>
              </div>

              <Separator />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const messages: { title: string; date: string }[] = [
  {
    title: 'You were invited to a poll',
    date: 'MON MAY 1, 2023',
  },
  {
    title: 'Your loan request was approved',
    date: 'MON MAY 4, 2023',
  },
  {
    title: 'Your guarantor has been approved',
    date: 'MON MAY 4, 2023',
  },
  {
    title: 'You were invited to a poll',
    date: 'MON MAY 1, 2023',
  },
  {
    title: 'Your loan request was approved',
    date: 'MON MAY 4, 2023',
  },
  {
    title: 'Your guarantor has been approved',
    date: 'MON MAY 4, 2023',
  },
  {
    title: 'You were invited to a poll',
    date: 'MON MAY 1, 2023',
  },
  {
    title: 'Your loan request was approved',
    date: 'MON MAY 4, 2023',
  },
  {
    title: 'Your guarantor has been approved',
    date: 'MON MAY 4, 2023',
  },
  {
    title: 'You were invited to a poll',
    date: 'MON MAY 1, 2023',
  },
  {
    title: 'Your loan request was approved',
    date: 'MON MAY 4, 2023',
  },
  {
    title: 'Your guarantor has been approved',
    date: 'MON MAY 4, 2023',
  },
];
