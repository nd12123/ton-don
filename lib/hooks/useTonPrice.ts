// lib/hooks/useTonPrice.ts
"use client";
import { useEffect, useState } from "react";

export function useTonPrice() {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // любой надёжный эндпоинт; пример — tonapi.io. Подставь свой.
        const res = await fetch("/api/ton-price"); // проксируй через свой API-route
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) throw new Error("Not JSON");

        const data = await res.json();
        // Пример: ожидаем { usd: number }
        const usd = Number(data?.usd);
        if (!Number.isFinite(usd)) throw new Error("Bad payload");
        if (!cancelled) setPrice(usd);
      } catch (e) {
        // Тихий фолбэк, чтобы UI не падал
        console.log(e)
        if (!cancelled) setPrice(0);
        // опционально: console.warn("useTonPrice error", e);
      }
    }

    load();
    const id = setInterval(load, 60_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return price;
}
