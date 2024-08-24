import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
import { AppContextProvider } from '@/context/app-context';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import TanstackProvider from '@/context/tanstack-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
export const metadata: Metadata = {
  title: 'Cooperative Management Software | User Log in',
  // description: 'Coope',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiase',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<p>Loading...</p>}>
            <TanstackProvider>
              <AppContextProvider>
                {children}
                <Toaster richColors duration={2000} closeButton />
              </AppContextProvider>
            </TanstackProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
