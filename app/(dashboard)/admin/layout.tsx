"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/lib/hooks/useUser";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoggedIn } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.replace("/");         // не вошёл — на главную
    else if (!isAdmin) router.replace("/dashboard"); // не админ — в дашборд
  }, [isAdmin, isLoggedIn, router]);

  // Пока проверяем — можно показать лоадер:
  if (!isLoggedIn || !isAdmin) return null;

  return <>{children}</>;
}
