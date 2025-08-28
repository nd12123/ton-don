import {
  dailyIncomeRow, dailyIncomeActive,
  actualProfit, totalEarnedSoFar, plannedProfit
} from '@/lib/earnings';

const iso = (d: Date) => d.toISOString();

describe('earnings', () => {
  const today = new Date();
  const yesterday = new Date(Date.now() - 24*60*60*1000);

  it('dailyIncomeRow: APR как дневной %', () => {
    expect(dailyIncomeRow({ amount: 3, apr: 4, status:'active' } as any)).toBeCloseTo(0.12);
    expect(dailyIncomeRow({ amount: 2, apr: 4, status:'active' } as any)).toBeCloseTo(0.08);
  });

  it('actualProfit: активный сегодня считает 1 день', () => {
    const r = { amount: 3, apr: 4, duration: 30, status:'active', created_at: iso(today) } as any;
    expect(actualProfit(r, today)).toBeCloseTo(0.12); // 3 * 0.04 * 1
  });

  it('actualProfit: активный со вчера = 2 дня', () => {
    const r = { amount: 1, apr: 4, duration: 30, status:'active', created_at: iso(yesterday) } as any;
    expect(actualProfit(r, today)).toBeCloseTo(0.08); // 1 * 0.04 * 2 = 0.08
  });

  it('actualProfit: не больше duration', () => {
    const start = new Date(Date.now() - 10*24*60*60*1000); // 10 дней назад
    const r = { amount: 10, apr: 4, duration: 3, status:'active', created_at: iso(start) } as any;
    expect(actualProfit(r, today)).toBeCloseTo(10 * 0.04 * 3);
  });

  it('plannedProfit: сумма за весь срок', () => {
    const r = { amount: 100, apr: 4, duration: 10 } as any;
    expect(plannedProfit(r)).toBeCloseTo(100 * 0.04 * 10);
  });

  it('totalEarnedSoFar: суммирует разные записи', () => {
    const rows = [
      { amount: 3, apr:4, duration:30, status:'active', created_at: iso(today) },
      { amount: 2, apr:4, duration:30, status:'active', created_at: iso(today) },
      { amount: 1, apr:4, duration:30, status:'active', created_at: iso(yesterday) },
    ] as any[];
    expect(totalEarnedSoFar(rows, today)).toBeCloseTo(0.12 + 0.08 + 0.08);
  });
});
