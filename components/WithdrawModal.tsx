"use client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
//import { supabase } from "@/lib/supabase";
import { StakeRecord } from "@/lib/store"; // создайте общий тип

interface Props {
  open: boolean;
  onClose: () => void;
  stake: StakeRecord;
  /**
   * Вызывается, когда пользователь вводит сумму и жмёт «Withdraw»
   * @param stake — вся запись, из которой можно взять id, wallet, amount и т.д.
   * @param amount — сколько вывести
   */
  onConfirm: (stake: StakeRecord, amount: number) => void;
}

export function WithdrawModal({ open, onClose, stake, onConfirm }: Props) {


  const [amount, setAmount] = useState<number>(0);

  return ( //<Transition appear show={open} as={Fragment}> ... </Transition>
      <Dialog as="div" className="relative z-50" onClose={onClose} open={open}>
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4 dark:text-gray-100">
              Withdraw from <strong>{stake.validator}</strong>
            </Dialog.Title>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Your stake: <strong>{stake.amount} TON</strong>
            </p>

            <label className="block mb-2 text-sm dark:text-gray-200">
              Amount to withdraw
            </label>
            <input
              type="number"
              min={0}
              max={stake.amount}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(stake, amount)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Withdraw
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
  );


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
}
