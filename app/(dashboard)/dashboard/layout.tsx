'use server';
import { Separator } from '@/components/ui/separator';
import React, { Suspense } from 'react';
import Messages from './messages';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-9 h-full">
      <div className="lg:col-span-7 lg:h-[94vh] overflow-y-auto px-4 py-2">
        {children}
      </div>
      <div className="lg:col-span-2 bg-white px-4 py-2 h-[94vh] overflow-y-auto">
        <div className="space-y-2">
          <h1 className="text-default font-semibold text-sm">Messages</h1>
          <Separator />
        </div>
        <Suspense fallback={<p>Loading</p>}>
          <Messages />
        </Suspense>
      </div>
    </div>
  );
}
