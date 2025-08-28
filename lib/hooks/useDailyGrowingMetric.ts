"use client";

import { useEffect, useMemo, useState } from "react";

const MS_PER_DAY = 86_400_000;

// --- детерминированный RNG по строке (дата + seed) ---
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededRand(seedStr: string) {
  const seed = xmur3(seedStr)();
  const rnd = mulberry32(seed);
  return rnd();
}

function startOfDayUTC(d: Date) {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
function dayIndexFrom(startISO: string, now = new Date()) {
  const start = new Date(startISO);
  const days = Math.floor(
    (now.getTime() - startOfDayUTC(start)) / MS_PER_DAY
  );
  return Math.max(0, days);
}

export function useDailyGrowingMetric(opts: {
  /** базовое значение на момент startDate (например, стартовый TVL в TON) */
  base: number;
  /** от какой даты считаем рост, ISO (UTC), напр. '2025-08-20T00:00:00Z' */
  startDate: string;
  /** минимальный суточный прирост */
  minStep: number;
  /** максимальный суточный прирост */
  maxStep: number;
  /** соль для RNG, чтобы стабильно получать ту же последовательность */
  seed?: string;
  /** период обновления внутри дня (мс) — как часто “плыть” число */
  tickMs?: number;
}) {
  const {
    base,
    startDate,
    minStep,
    maxStep,
    seed = "ton-stake",
    tickMs = 1000,
  } = opts;

  const [now, setNow] = useState<Date>(() => new Date());

  // тикаем время, чтобы число плавно росло в течение дня
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);

  const value = useMemo(() => {
    const idx = dayIndexFrom(startDate, now);

    // сумма приростов за прошедшие полные дни
    let past = 0;
    for (let d = 0; d < idx; d++) {
      const r = seededRand(`${seed}:${d}`);
      const step = minStep + r * (maxStep - minStep);
      past += step;
    }

    // прирост за текущий день — доля суток уже прошла
    const keyToday = `${seed}:${idx}`;
    const rToday = seededRand(keyToday);
    const todayStep = minStep + rToday * (maxStep - minStep);

    const startToday = startOfDayUTC(now);
    const frac =
      Math.max(0, Math.min(1, (now.getTime() - startToday) / MS_PER_DAY));

    return base + past + todayStep * frac;
  }, [base, startDate, minStep, maxStep, seed, now]);

  return value;
}
