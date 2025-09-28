// components/WithdrawModal.tsx
"use client";

import { Dialog } from "@headlessui/react";
import { useMemo, useState } from "react";
import { StakeRecord } from "@/lib/store";
import { actualProfit } from "@/lib/earnings";
import { useT } from "@/i18n/react";

interface Props {
  open: boolean;
  onClose: () => void;
  stake: StakeRecord;
  onConfirm: (stake: StakeRecord, amount: number) => void;
}

export function WithdrawModal({ open, onClose, stake, onConfirm }: Props) {
  const t = useT("modals");
  const [submitting, setSubmitting] = useState(false);

  const fullTon = stake.amount;

  
  // профит к выводу (не больше депозита и не меньше 0)
  const profitTon = useMemo(() => {
    const profit = fullTon * (stake.apr / 100) * stake.duration + fullTon
    console.log(fullTon, stake.apr, stake.duration)
    //const p = Number(actualProfit(stake)) || 0;
    return Math.max(0, profit); //
  }, [stake]);


  const fmt = (n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 6 });

  const handle = async (amount: number) => {
    try {
      setSubmitting(true);
      await Promise.resolve(onConfirm(stake, amount));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog as="div" className="relative z-50" onClose={submitting ? () => {} : onClose} open={open}>
      {/* overlay */}
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl p-6 shadow-xl bg-white dark:bg-gray-800">
          <Dialog.Title className="text-lg font-bold mb-4 dark:text-gray-100">
            {t("withdraw.title", { validator: stake.validator })}
          </Dialog.Title>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">{t("withdraw.yourStake")}</span>
              <span className="font-medium dark:text-gray-100">{fmt(fullTon)} TON</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">{t("withdraw.profit")}</span>
              <span className="font-medium dark:text-gray-100">{fmt(profitTon)} TON</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {t("common.cancel")}
            </button>

            <button
              onClick={() => handle(profitTon)}
              disabled={submitting || profitTon <= 0}
              className={`px-4 py-2 rounded text-white transition ${
                profitTon > 0 ? "bg-emerald-600 hover:bg-emerald-700" : "bg-emerald-600/50 cursor-not-allowed"
              }`}
              title={profitTon > 0 ? "" : t("withdraw.noProfit")}
            >
              {t("withdraw.withdrawProfit", { amount: fmt(profitTon) })}
            </button>

            <button
              onClick={() => handle(fullTon)}
              disabled={submitting || fullTon <= 0}
              className={`px-4 py-2 rounded text-white transition ${
                fullTon > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50 cursor-not-allowed"
              }`}
            >
              {t("withdraw.withdrawFull", { amount: fmt(fullTon) })}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
