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
    return <div className="flex flex-1 justify-center items-center w-full h-full">Cargando...</div>;
  }

  return (
    <div className="flex flex-1 overflow-hidden w-full h-full">
      {!isAuthRoute && <Sidebar />}
      <main className={`${
        !isAuthRoute
          ? "flex-1 flex-col justify-start items-center p-6 bg-gray-200 dark:bg-gray-900 rounded-r-lg overflow-auto w-full "
          : "flex-1 flex-col items-center"
      }`}>
        {children}
      </main>
    </div>
  );
}