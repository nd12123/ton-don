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

/**
 * useT с дженериком:
 * - умеет возвращать строки, объекты, массивы
 * - поддерживает интерполяцию для строк
 * - фоллбеком возвращает сам ключ (как раньше)
 */
export function useT(ns?: Namespace) {
  const ctx = useContext(I18nCtx);
  if (!ctx) {
    // безопасный заглушечный переводчик
    return function tAny<T = string>(key: string, _params?: Record<string, any>, fallback?: T): T {
      return (fallback ?? (key as unknown as T)) as T;
    };
  }

  const base = ns ? ctx.messages[ns] : ctx.messages;

  return function tAny<T = string>(
    key: string,
    params?: Record<string, any>,
    fallback?: T
  ): T {
    const val = key
      .split(".")
      .reduce<any>((acc, k) => (acc != null ? acc[k] : undefined), base);

    if (val == null) return (fallback ?? (key as unknown as T)) as T;

    if (typeof val === "string" && params) {
      return val.replace(/\{(\w+)\}/g, (_m, p) =>
        params[p] != null ? String(params[p]) : `{${p}}`
      ) as unknown as T;
    }
    return val as T; // ← ключ: отдаём массивы/объекты как есть
  };
}

// ре-экспортим типы, чтобы в layout можно было:
// import { I18nProvider, type Locale } from "@/i18n/react";
export type { Locale, Namespace };
