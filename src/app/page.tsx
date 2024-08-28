// /src/app/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/auth/login');
  }, [router]);

  return null;  // O muestra un mensaje de redirección si lo prefieres
}
