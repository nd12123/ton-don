// components/ProfileHistorySection.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import ProfileHistory from "@/components/ProfileHistory";
import { WithdrawModal } from "@/components/WithdrawModal";
import { useStakeStore } from "@/lib/store";
import type { StakeRecord } from "@/lib/store";
import { actualProfit } from "@/lib/earnings";

export function ProfileHistorySection({ wallet }: { wallet: string }) {
  const { history, fetchHistory, withdrawStake, loading, error } = useStakeStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<StakeRecord | null>(null);

  // грузим историю при монтировании/смене кошелька
  useEffect(() => {
    if (wallet) fetchHistory(wallet);
  }, [wallet, fetchHistory]);

  const onWithdrawClick = (stake: StakeRecord) => {
    setSelected(stake);
    setOpen(true);
  };

  // onConfirm вызывается модалкой: просто пишем в историю и закрываем
  const onConfirm = async (stake: StakeRecord, amountTon: number) => {
    // безопасно клампим сумму (на всякий)
    const profit = Math.max(0, Number(actualProfit(stake) ?? 0));
    const max = Math.max(0, Math.min(stake.amount, profit || stake.amount));
    const amt = Math.min(Math.max(amountTon, 0), max);

    await toast.promise(
      withdrawStake(stake.id, amt),
      {
        loading: "Сохраняем запрос на вывод…",
        success: "Запрос сохранён",
        error: (e) => e?.message || "Ошибка сохранения",
      }
    );

    setOpen(false);
    setSelected(null);

    // опционально — перезагрузить историю из бэка для консистентности
    // await fetchHistory(wallet);
  };

  return (
    <>
      {/* можно показать лоадер/ошибку над списком */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <ProfileHistory history={history} onWithdrawClick={onWithdrawClick} />

      {selected && (
        <WithdrawModal
          open={open}
          onClose={() => { setOpen(false); setSelected(null); }}
          stake={selected}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
}
