"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast"
export function StakeModal({
  open,
  onClose,
  onConfirm,
  amount,
  validator,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  validator: string;
}) {
  //console.log("modal open?", open);
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
  
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-xl bg-gray-50 p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <h2 className="text-lg font-bold mb-4">
              Подтвердите стейк
            </h2>
  
            <p className="text-sm text-gray-700 mb-6">
              Вы уверены, что хотите застейкать <strong>{amount} TON</strong> у{" "}
              <strong>{validator}</strong>?
            </p>
  
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
              >
                Отмена
              </button>
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
            </div>
          </div>
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