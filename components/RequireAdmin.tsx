// components/RequireAdmin.tsx
"use client";
import { ReactNode } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useTonReady } from "@/lib/ton/useTonReady";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const wallet = useTonWallet();
  const ready = useTonReady();

  // Провайдер не смонтирован (не должен случаться, если обёрнут root'ом)
  if (wallet === undefined) {
    return <div className="p-4 text-red-600">TonConnect provider не найден.</div>;
  }

  // Ждём восстановления — показываем лишь лоадер, НО НЕ «Подключить»
  if (!ready) {
    return <div className="p-6 text-sm text-gray-500">Восстанавливаем подключение…</div>;
  }

  // Готово, но кошелёк не подключён — тут уже можно рендерить кнопку/текст
  if (!wallet?.account) {
    return <div className="p-6">Подключите кошелёк в шапке.</div>;
  }

  return <>{children}</>;
}
