// components/StakeContractModal.tsx
"use client";

import { useStakeContract } from "@/lib/ton/useContract";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useT } from "@/i18n/react";

export interface StakeModalProps {
  open: boolean;
  onClose: () => void;
  /** Раньше ожидали реальный txHash; сейчас передаём "confirmed" как маркер согласия */
  onConfirm: (txHashOrMarker: string) => void;
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
  const t = useT("modals");
  const { stakeTon } = useStakeContract();
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (isSending) return;
    setIsSending(true);
    setError(null);
    try {
      // ✅ Ключевой момент: если пользователь подтвердил в кошельке,
      // этот await успешно завершится. Если отменил — будет throw.
      await stakeTon(amount);

      // ⬇️ Передаём «маркер согласия» наверх; сервер/стор могут принять его как txHash
      // (или вообще проигнорировать, если txHash не обязателен).
      onConfirm("confirmed");

      // Закрываем модалку ТОЛЬКО при успехе
      onClose();
    } catch (err: any) {
      // Пользователь отменил или ошибка кошелька/сети
      const msg = err?.message || "Transaction failed";
      console.error("🔴 [StakeModal] sendTransaction error:", msg);
      setError(msg);
      // Модалку не закрываем — даём попробовать снова
    } finally {
      setIsSending(false);
    }
  };

  if (!open) return null;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          if (!isSending) onClose();
        }}
      >
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4">
              {t("stake.title")}
            </Dialog.Title>

            <p className="mb-6 text-sm text-gray-700">
              {t("stake.question", { amount, validator })}
            </p>

            {error && (
              <div className="mb-4 rounded-md bg-red-500/15 text-red-700 border border-red-200 px-3 py-2 text-sm">
                {error}
              </div>
            )}

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
                {t("common.cancel")}
              </button>

              <button
                onClick={handleConfirm}
                disabled={isSending}
                className={`px-4 py-2 text-sm text-white rounded ${
                  isSending ? "bg-blue-400 cursor-wait" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isSending ? t("stake.sending") : t("stake.confirm")}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
