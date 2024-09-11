import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex h-screen items-center px-6">{children}</div>
  );
}
