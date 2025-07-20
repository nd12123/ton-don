// lib/ton/useAsyncInitialize.ts
"use client";

import { useEffect, useState, DependencyList } from "react";

export function useAsyncInitialize<T>(
  factory: () => Promise<T | undefined>,
  deps: DependencyList
): T | undefined {
  const [state, setState] = useState<T>();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const result = await factory();
      if (!cancelled && result !== undefined) {
        setState(result);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Отключаем проверку на обязательное включение `factory` в deps,
    // потому что мы явно передаём нужный список зависимостей при вызове хука
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
