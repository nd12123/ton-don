// src/lib/earnings.ts
import type { StakeRecord } from "@/lib/store";
//import { profile } from "console";

export const MS_PER_DAY = 86_400_000;

/** Приводим APR к доле (0.04), независимо от того, пришло 4 или 0.04 */
function normalizeApr(apr: number): number {
  if (apr == null || Number.isNaN(apr)) return 0;
  return apr > 1 ? apr / 100 : apr; // 4 -> 0.04, 0.04 -> 0.04
}

/** Целое количество прошедших дней между датами (минимум 0) */
function elapsedDays(fromISO: string, to: Date = new Date()): number {
  const from = new Date(fromISO);
  const diff = Math.floor((to.getTime() - from.getTime()) / MS_PER_DAY);
  return Math.max(0, diff);
}

/** Дневной доход для строки (годовая ставка / 365) */
export function dailyIncomeRow(r: StakeRecord): number {
  const rate = normalizeApr(r.apr);
  //console.log("dailyIncomeRow", r.amount, rate)
  return (r.amount ?? 0) * rate ; // / 365
}

/** Суммарный дневной доход по всем активным стейкам */
export function dailyIncomeActive(rows: StakeRecord[]): number {
  return rows
    .filter(r => r.status === "active")
    .reduce((sum, r) => sum + dailyIncomeRow(r), 0);
}
/** Общий баланс по всем активным стейкам */
export function balanceActive(rows: StakeRecord[]): number {
  return rows
    .filter(r => r.status === "active")
    .reduce((sum, r) => sum + r.amount, 0);
}

/**
 * Сколько реально заработано на текущий момент по конкретному стейку.
 * - active: по прошедшим дням, но не больше duration
 * - completed: фиксированный доход за duration
 */
export function actualProfit(r: StakeRecord, now: Date = new Date()): number {
  const rate = normalizeApr(r.apr);
  const amount = r.amount ?? 0;
  const duration = Math.max(0, r.duration ?? 0);

  if (!r.created_at) return 0;

  const passed = Math.min(elapsedDays(r.created_at, now), duration);
  const daysForProfit = r.status === "completed" ? duration : passed;
  //console.log("Amount, rate, days: ",amount, rate, daysForProfit, " profit? ", amount * rate * (daysForProfit/ 365))

  return amount * rate * (daysForProfit) ; // / 365
}

/** Сумма реально заработанного по всем стейкам на данный момент */
export function totalEarnedSoFar(rows: StakeRecord[], now: Date = new Date()): number {
  return rows.reduce((sum, r) => sum + actualProfit(r, now), 0);
}

/** Красивый статус (если нужен) */
export function displayStatus(r: StakeRecord): string {
  if (r.status === "completed") return "Завершён";
  if (r.status === "active") return "Активен";
  return r.status ?? "—";
}


// План: сколько заработает запись за всю длительность
export function plannedProfit(r: StakeRecord) {
  // apr — ДНЕВНОЙ процент (4/7/10%)
  const rate = normalizeApr(r.apr);
  //console.log("amount rate days ", r.amount, rate, r.duration, "planned profit: ", r.amount * (rate) * r.duration)
  return r.amount * (rate) * r.duration;
}