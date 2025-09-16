// /i18n/react.tsx
"use client";

import React, { createContext, useContext } from "react";
import type { Locale, Namespace } from ".";

export type Messages = Record<Namespace, any>;

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
};

const I18nCtx = createContext<I18nContextValue | null>(null);

export function I18nProvider(props: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  // важный момент: именно так типизируем пропсы — чтобы TS знал про locale/messages
  const { locale, messages, children } = props;
  return <I18nCtx.Provider value={{ locale, messages }}>{children}</I18nCtx.Provider>;
}

// безопасный get по "a.b.c"
function deepGet(obj: any, path: string) {
  return path.split(".").reduce((acc, k) => (acc != null ? acc[k] : undefined), obj);
}

// t c неймспейсом: useT("home")("pills.simple")
export function useT(ns?: Namespace) {
  const ctx = useContext(I18nCtx);
  if (!ctx) {
    // вне провайдера — возвращаем идентичность
    return (key: string) => key;
  }
  return (key: string) => {
    const base = ns ? ctx.messages?.[ns] : ctx.messages;
    const val = deepGet(base, key);
    if (typeof val === "string") return val;

    if (process.env.NODE_ENV !== "production") {
      console.warn(`[i18n] missing key: ${ns ? ns + "." : ""}${key}`);
    }
    // Фоллбек: возвращаем именно "ns.key" чтобы было видно, что не найдено
    return ns ? `${ns}.${key}` : key;
  };
}

// ре-экспортим типы, чтобы в layout можно было:
// import { I18nProvider, type Locale } from "@/i18n/react";
export type { Locale, Namespace };
