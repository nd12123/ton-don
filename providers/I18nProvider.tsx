// providers/I18nProvider.tsx
/*
"use client";
import React, { createContext, useContext, useMemo } from "react";
import type { Dict } from "@/lib/i18n/getDictionary"; //

const I18nCtx = createContext<Dict | null>(null);

export function I18nProvider({ dict, children }: { dict: Dict; children: React.ReactNode }) {
  const value = useMemo(() => dict, [dict]);
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useT() {
  const dict = useContext(I18nCtx);
  return (key: string) =>
    key.split(".").reduce<any>((acc, k) => (acc ? acc[k] : undefined), dict) ?? key; // безопасный фоллбек
}
  */
