// components/RequireAdmin.tsx
// Этот модуль должен еще проверять что пользователь-админ
"use client";
import { ReactNode } from "react";
import { useTonWallet } from "@tonconnect/ui-react"; //, useIsConnectionRestored
import { useTonReady } from "@/lib/ton/useTonReady";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const wallet = useTonWallet();
  //const restored = useIsConnectionRestored(); // ← ждём именно завершения восстановления
  const ready = useTonReady();
//ПРОВЕРКА КОШЕЛЬКА НА АДМИНА!
  if (!ready) {
    return <div className="p-6 text-sm text-gray-500">Восстанавливаем подключение…</div>;
  }
  if (!wallet?.account) {
    return <div className="p-6">Подключите кошелёк в шапке.</div>;
  }
  return <>{children}</>;
}
