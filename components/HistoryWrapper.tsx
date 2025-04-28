"use client";

import dynamic from "next/dynamic";

// динамически подгружаем ваш клиентский компонент, без SSR
const HistoryClient = dynamic(
  () => import("@/components/HistoryClient"),
  { ssr: false }
);

export default function HistoryWrapper() {
    console.log("where 0")
  return <HistoryClient />;
}
