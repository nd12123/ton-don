import { useEffect } from "react";

export function useAutoSelectPlan(
  stakeAmount: number,
  plansList: { name: string; min: number; max?: number }[],
  selectedPlanName: string,
  setSelectedPlanName: (name: string) => void
) {
  useEffect(() => {
    const auto = plansList.find(
      (p) =>
        stakeAmount >= p.min &&
        (p.max === undefined || stakeAmount <= p.max)
    );
    if (auto && auto.name !== selectedPlanName) {
      setSelectedPlanName(auto.name);
    }
  }, [stakeAmount, selectedPlanName, plansList, setSelectedPlanName]);
}
