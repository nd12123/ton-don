"use client";

import { Dialog } from "@headlessui/react";
import { useMemo, useState } from "react";
import { StakeRecord } from "@/lib/store";
import { useT } from "@/i18n/react";

interface Props {
  open: boolean;
  onClose: () => void;
  stake: StakeRecord;
  onConfirm: (stake: StakeRecord, amount: number) => void;
}

export function WithdrawModal({ open, onClose, stake, onConfirm }: Props) {
  const t = useT("modals");
  const tf = (key: string, fallback: string, params?: Record<string, any>) => {
    const v = t(key, params as any);
    return typeof v === "string" && v === key ? fallback : (v as string);
  };

  const [submitting, setSubmitting] = useState(false);

  const fullTon = stake.amount;

  // (как у тебя) здесь "profitTon" фактически full = principal + profit
  const profitTon = useMemo(() => {
    const profit = fullTon * (stake.apr / 100) * stake.duration + fullTon;
    return Math.max(0, profit);
  }, [stake]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const handle = async (amount: number) => {
    setSubmitting(true);
    try {
      await onConfirm(stake, amount);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      as="div"
      className="relative z-50"
      onClose={submitting ? () => {} : onClose}
      open={open}
    >
      <div className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* ✅ форсируем тёмный фон модалки */}
        <Dialog.Panel className="w-full max-w-md rounded-xl p-6 shadow-xl bg-[#0F1B2E] border border-[#1f2e4a] text-sky-50">
          <Dialog.Title className="text-lg font-bold mb-4">
            {tf("withdraw.title", "Withdraw from {validator}", {
              validator: stake.validator,
            })}
          </Dialog.Title>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-sky-200/85">
                {tf("withdraw.yourStake", "Your stake")}
              </span>
              <span className="font-medium text-sky-50">{fmt(fullTon)} TON</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sky-200/85">
                {tf("withdraw.profit", "Payout")}
              </span>
              <span className="font-medium text-sky-50">
                {fmt(profitTon)} TON
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded border border-[#1f2e4a] text-sky-200 hover:bg-[#12203a] transition"
            >
              {tf("common.cancel", "Cancel")}
            </button>

            <button
              onClick={() => handle(profitTon)}
              disabled={submitting || profitTon <= 0}
              className={`px-4 py-2 rounded text-white transition ${
                profitTon > 0
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-600/50 cursor-not-allowed"
              }`}
              title={profitTon > 0 ? "" : tf("withdraw.noProfit", "No payout")}
            >
              {tf(
                "withdraw.withdrawFull",
                "Withdraw full: {amount} TON",
                { amount: fmt(profitTon) }
              )}
            </button>

            <button
              onClick={() => handle(fullTon)}
              disabled={submitting || fullTon <= 0}
              className={`px-4 py-2 rounded text-white transition ${
                fullTon > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600/50 cursor-not-allowed"
              }`}
            >
              {tf(
                "withdraw.withdrawProfit",
                "Withdraw principal: {amount} TON",
                { amount: fmt(fullTon) }
              )}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
