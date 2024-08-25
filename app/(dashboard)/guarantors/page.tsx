'use server';
import React from 'react';

import GuarantorTableTabs from '@/components/guarantor-tabs';

export default async function Guarantors() {
  return (
    <div className="px-4 py-2 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-default font-semibold text-sm">Guarantor</h1>
      </div>
      <div className="py-4 border border-light rounded-lg bg-white overflow-y-auto min-h-[800px]">
        <GuarantorTableTabs />
      </div>
    </div>
  );
}
