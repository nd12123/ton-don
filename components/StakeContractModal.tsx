// components/StakeModal.tsx
"use client";


import { useStakeContract } from "@/lib/ton/useContract";
//import { useTonConnect } from "@/lib/ton/useTonConnect";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
//import { useTonConnectUI } from "@tonconnect/ui-react";

export interface StakeModalProps {
  open: boolean;
  onClose: () => void;
  /** Receives the real txHash string */
  onConfirm: (txHash: string) => void;
  amount: number;
  validator: string;
}

export function StakeContractModal({
  open,
  onClose,
  //onConfirm,
  amount,
  validator,
}: StakeModalProps) {

    //const { wallet, connected } = useTonConnect();
  const { stakeTon } = useStakeContract(); //admin


  const handleConfirm = async () => {
    //console.log("🟢 [StakeModal] confirm clicked");
    try {
      // Compose your actual sendTransaction payload here:
        stakeTon(amount)
      /*
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
      
      */
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
