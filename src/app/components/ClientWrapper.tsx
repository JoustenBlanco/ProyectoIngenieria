'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Landign/sidebar';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith('/homepages/auth');

  return (
    <div className="flex flex-1 overflow-hidden w-full h-full">
      {!isAuthRoute && <Sidebar />}
      <main className={`${
        !isAuthRoute
          ? "flex-1 flex-col justify-start items-center p-6 bg-gray-200 rounded-r-lg overflow-auto w-full"
          : "flex-1 flex-col items-center"
      }`}>
        {children}
      </main>
    </div>
  );
}