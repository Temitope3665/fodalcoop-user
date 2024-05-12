import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-9 h-full">
      <div className="col-span-7 bg-[#F8F9FD] h-full px-4 py-2">{children}</div>
      <div className="col-span-2 bg-white px-4 py-2">
        <h1 className="text-default font-semibold text-sm">Messages</h1>
      </div>
    </div>
  );
}
