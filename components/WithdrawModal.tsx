"use client";
import { Dialog } from "@headlessui/react";
import { useMemo, useState } from "react";
import { StakeRecord } from "@/lib/store";
import { actualProfit } from "@/lib/earnings";

interface Props {
  open: boolean;
  onClose: () => void;
  stake: StakeRecord;
  onConfirm: (stake: StakeRecord, amount: number) => void;
}

export function WithdrawModal({ open, onClose, stake, onConfirm }: Props) {
  const [submitting, setSubmitting] = useState(false);

  // профит к выводу (на всякий – не больше депозита и не меньше 0)
  const profitTon = useMemo(() => {
    const p = Number(actualProfit(stake)) || 0;
    return Math.max(0, Math.min(p, stake.amount));
  }, [stake]);

  const fullTon = stake.amount;

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
            Withdraw from <strong>{stake.validator}</strong>
          </Dialog.Title>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Your stake</span>
              <span className="font-medium dark:text-gray-100">{fmt(fullTon)} TON</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Available profit</span>
              <span className="font-medium dark:text-gray-100">
                {fmt(profitTon)} TON
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={() => handle(profitTon)}
              disabled={submitting || profitTon <= 0}
              className={`px-4 py-2 rounded text-white transition
                ${profitTon > 0
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-600/50 cursor-not-allowed"}`}
              title={profitTon > 0 ? "" : "No profit to withdraw yet"}
            >
              Withdraw profit ({fmt(profitTon)} TON)
            </button>

            <button
              onClick={() => handle(fullTon)}
              disabled={submitting || fullTon <= 0}
              className={`px-4 py-2 rounded text-white transition
                ${fullTon > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600/50 cursor-not-allowed"}`}
            >
              Withdraw full ({fmt(fullTon)} TON)
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

  /*
  const [amount, setAmount] = useState(stake.amount);
  const [loading, setLoading] = useState(false);

  async function handleWithdraw() {
    setLoading(true);
    // 1) Тут можно вызвать TonConnect для реального перевода:
    // await tonConnect.sendPayment({ to: stake.wallet, amount });

    // 2) Обновляем Supabase
    await supabase
      .from("stakes")
      .update({ withdrawn: true, withdraw_tx: "TX_HASH" })
      .eq("id", stake.id);

    setLoading(false);
    //onWithdrawn();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <Dialog.Title className="text-lg font-bold mb-4">
            Withdraw from {stake.validator}
          </Dialog.Title>
          <p className="mb-4">
            Max available: <strong>{stake.amount} TON</strong>
          </p>
          <input
            type="number"
            min={0}
            max={stake.amount}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border rounded mb-4 bg-gray-50 dark:bg-gray-700"
          />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2">
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Processing…" : "Withdraw"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
  */

