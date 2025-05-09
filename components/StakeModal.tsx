
// components/StakeModal.tsx
"use client";

import React from "react"; //, { useEffect }
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
//import toast from "react-hot-toast";

import { useTonConnectUI } from "@tonconnect/ui-react";
//import { useStakeStore } from "@/lib/store";

interface StakeModalProps {
    open: boolean;
    onClose: () => void;
    //onConfirm: () => void;          // remove this
    amount: number;
    validator: string;
    walletAddress: string;
    apr: number;
    duration: number;
    onConfirm: (txHash: string) => void;
  //onConfirm: () => void;
}

export function StakeModal({
  open,
  onClose,
  //onConfirm,        // we’ll replace this
  amount,
  validator,
  walletAddress,
  apr,
  duration,
  onConfirm,
}: StakeModalProps) {
  /*
  // Берём из zustand статус загрузки и последнюю ошибку
  const loading = useStakeStore((s) => s.loading);
  const error   = useStakeStore((s) => s.error);
  // При появлении ошибки покажем toast (react-hot-toast)
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
*/

const [tonConnectUI] = useTonConnectUI();
const [loading, setLoading] = useState(false);

const handleConfirm = async () => {
  if (!walletAddress || amount <= 0) return;

  setLoading(true);
  try {
    // build your contract payload here! for now we’ll just
    // send TON to the validator address (no payload)
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 3600,  // 1h TTL
      messages: [
        {
          address: "0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL",// your contract address
          amount: ((amount + 0.05) * 1e9).toString(),       // nanotons
          sendMode: 3, 
          // payload: "...",                        // if you need a payload
        },
      ],
    };

    const result = await tonConnectUI.sendTransaction(transaction);
    // result.boc is the signed BOC; you can fetch the hash from it.
    // But TonConnect also sets `result.inMessageHash` in recent SDKs:
    const txHash = (result as any).inMessageHash ?? result.boc;

    // Call the parent onConfirm with our new txHash
    onConfirm(txHash);
  } catch (e) {
    console.error("Failed to send tx", e);
  } finally {
    setLoading(false);
    onClose();
  }
};

  return (
    <>
      {/* Должен быть один <Toaster/> в вашем приложении, лучше в layout */}
   

      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={onClose}
        >
          {/* затемнённый фон */}
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl">
              <Dialog.Title className="text-lg font-bold mb-4 dark:text-gray-300">
                Подтвердите стейк
              </Dialog.Title>

              <p className="text-sm text-gray-700 dark:text-blue-300 mb-6">
                Сделать стейк размером{" "}
                <strong>{amount} TON</strong> 
                через{" "}
                      <strong>{validator}</strong>
                 на {" "}
                {/**
                  */}
                <strong>{duration}</strong> дней?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Отмена
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="inline-block animate-spin h-4 w-4 
                                     border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    "Подтвердить"
                  )}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
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