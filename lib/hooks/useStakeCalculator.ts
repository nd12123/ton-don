// lib/hooks/useStakeCalculator.ts
import { useState, useEffect } from "react";
import { PLANS, Plan } from "@/components/Plans";

export function useStakeCalculator(initialAmount = 500, initialDuration = 12) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [duration, setDuration] = useState<number>(initialDuration);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(
    PLANS.find(p => amount >= p.min && (p.max === undefined || amount <= p.max))!
  );

  // Когда меняется сумма — подбираем тариф
  useEffect(() => {
    const plan = PLANS.find(p =>
      amount >= p.min && (p.max === undefined || amount <= p.max)
    );
    if (plan && plan.name !== selectedPlan.name) {
      setSelectedPlan(plan);
    }
  }, [amount]);

  // Когда меняется тариф (например, из UI-кнопок) — правим сумму на его min
  function selectPlan(planName: string) {
    const plan = PLANS.find(p => p.name === planName)!;
    setSelectedPlan(plan);
    setAmount(plan.min);
  }

  // Расчёт доходности
  function earnings(days: number) {
    return ((amount * (selectedPlan.apr / 100)) / 365) * days;
  }

  return {
    amount,
    setAmount,
    duration,
    setDuration,
    selectedPlan,
    selectPlan,
    earnings,
  };
}
