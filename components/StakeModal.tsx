"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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
  
  console.log("modal open?", open);
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[99]" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
  
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
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
                  onConfirm();
                  onClose();
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
