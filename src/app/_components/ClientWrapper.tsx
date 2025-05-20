'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Landign/sidebar';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from './feedBack/loading';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/homepages/auth');
  const { status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || (!isAuthRoute && status === 'loading')) {
    return <Loading />;
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