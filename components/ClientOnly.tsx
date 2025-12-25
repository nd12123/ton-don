// components/ClientOnly.tsx
"use client";
import { useEffect, useState } from "react";
export default function ClientOnly({
  children,
  fallback = <div style={{ visibility: 'hidden' }} aria-hidden="true">&nbsp;</div>
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
