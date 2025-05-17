// components/RequireAdmin.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/lib/hooks/useUser";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isAdmin, isLoading } = useUserRole();
  const router = useRouter();

  // Флаг: был ли хоть один раз успешный connect
  const hasEverConnected = useRef(false);
  // Редиректим только один раз
  const hasRedirected = useRef(false);

  // Как только isLoggedIn становится true — запоминаем, что подсоединились
  useEffect(() => {
    if (isLoggedIn) {
      hasEverConnected.current = true;
    }
  }, [isLoggedIn]);

  // Когда уже подключались хотя бы раз, и данные загрузились, но не админ — редирект
  useEffect(() => {
    if (
      hasEverConnected.current && // юзер уже пытался зайти
      !isLoading &&               // TonConnect UI уже отработал
      hasEverConnected.current && // ещё раз для ясности
      !isAdmin &&                 // это не админ
      !hasRedirected.current      // редирект ещё не был
    ) {
      hasRedirected.current = true;
      router.replace("/");
    }
  }, [isLoading, isAdmin, router]);

  // Всегда рендерим children — они могут содержать кнопку Connect Wallet
  return <>{children}</>;
}
