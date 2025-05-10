// components/StakeModal.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";

export interface StakeModalProps {
  open: boolean;
  onClose: () => void;
  /** Receives the real txHash string */
  onConfirm: (txHash: string) => void;
  amount: number;
  validator: string;
}

export function StakeModal({
  open,
  onClose,
  onConfirm,
  amount,
  validator,
}: StakeModalProps) {
  const [tonConnectUI] = useTonConnectUI();

  const handleConfirm = async () => {
    console.log("🟢 [StakeModal] confirm clicked");
    try {
      // Compose your actual sendTransaction payload here:
      const response = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: "0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL",      // or wherever you're sending
            amount: (amount * 1e9).toString(), // nanoton
          },
        ],
      });
      const txHash : string = response.boc
      console.log("🟢 [StakeModal] got txHash:", txHash);
      onConfirm(txHash);
    } catch (err) {
      console.error("🔴 [StakeModal] sendTransaction error:", err);
    } finally {
      onClose();
    }
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                className="px-4 py-2 text-sm text-gray-600 border rounded hover:bg-gray-100"
              >
                Отмена
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Подтвердить
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}


/*
//Варианты: toast.success, toast.error, toast.loading → мгновенный фидбек.
onClick={async () => {
  onClose();
  const notif = toast.loading('Отправка транзакции…');
  try {
    await sendStakeTx(amount, validator);
    toast.success('Стейк подтверждён!', { id: notif });
  } catch (e) {
    toast.error('Транзакция не удалась', { id: notif });
  }
}}
*/

/**
               * 
              <button
                onClick={() => {
                  try {
                    onConfirm();     // ваш код добавления в стор / отправки транзакции
                    //await addStake({ wallet: addr, amount, duration, apr });
                    //await completeStake(newId, txHash);
                    onClose();
                    toast.success('Stake успешно отправлен!');
                  } catch (err) {
                    console.error(err);
                    toast.error('Ошибка при стейке. Попробуйте ещё раз.');
                  }
                }}
                className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded"
              >
                Подтвердить
              </button>
               * 
               */