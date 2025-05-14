'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Landign/sidebar';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/homepages/auth');
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || (!isAuthRoute && status === 'loading')) {
    return (
      <div className="flex flex-1 justify-center items-center w-full h-full">
        <span className="flex items-center gap-2 text-lg text-gray-700 dark:text-gray-200">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          Cargando...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden w-full h-full">
      {!isAuthRoute && <Sidebar />}
      <main
        className={`flex-1 flex-col justify-start items-center bg-gray-200 dark:bg-gray-900 overflow-auto w-full
          ${!isAuthRoute ? "p-0 md:p-6 md:rounded-r-lg" : ""}
        `}
      >
        {children}
      </main>
    </div>
  );
}