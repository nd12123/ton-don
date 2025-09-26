// components/StakeModal.tsx
"use client";

import { useStakeContract } from "@/lib/ton/useContract";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

// helpers (можно вверху файла)
function isNonEmptyString(x: unknown): x is string {
  return typeof x === "string" && x.length > 0;
}

export interface StakeModalProps {
  open: boolean;
  onClose: () => void;
  /** Receives the real txHash string (or "pending") */
  onConfirm: (txHash: string) => void;
  amount: number;
  validator: string;
}

export function StakeContractModal({
  open,
  onClose,
  onConfirm,
  amount,
  validator,
}: StakeModalProps) {
  const { stakeTon } = useStakeContract(); // admin
  const [isSending, setIsSending] = useState(false);

const handleConfirm = async () => {
  if (isSending) return;
  setIsSending(true);
  try {
    const maybeTxHash: unknown = await stakeTon(amount); // <- unknown

    const txHash = isNonEmptyString(maybeTxHash)
      ? maybeTxHash
      : "pending";

    onConfirm?.(txHash);
  } catch (err) {
    console.error("🔴 [StakeModal] sendTransaction error:", err);
  } finally {
    setIsSending(false);
    onClose();
  }
};

  return (
    <Transition appear show={open} as={Fragment}>
      {/* Блокируем закрытие кликом по фону, пока отправляем */}
      <Dialog as="div" className="relative z-50" onClose={() => { if (!isSending) onClose(); }}>
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">
              Подтвердите стейк
            </Dialog.Title>
            <p className="mb-6 text-sm text-gray-700">
              Застейкать <strong>{amount} TON</strong> у{" "}
              <strong>{validator}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isSending}
                className={`px-4 py-2 text-sm border rounded ${
                  isSending
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Отмена
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSending}
                className={`px-4 py-2 text-sm text-white rounded ${
                  isSending
                    ? "bg-blue-400 cursor-wait"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isSending ? "Отправляем…" : "Подтвердить"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
