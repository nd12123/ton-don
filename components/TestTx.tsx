/*
"use client";
import { useTonConnectUI, CHAIN } from "@tonconnect/ui-react";
import toast from "react-hot-toast";

export default function TestTx() {
  const [tonConnectUI] = useTonConnectUI();

  const sendTest = async () => {
    if (!tonConnectUI.account) {
      toast.error("Сначала подключите кошелёк");
      return;
    }
    const notif = toast.loading("Отправка транзакции…");
    try {
      const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 60,
        network: CHAIN.TESTNET,               // ← здесь
        messages: [
          {
            address: tonConnectUI.account.address,
            amount: (0.001 * 1e9).toString(),
            payload: "",
          },
        ],
      });
      console.log("Result:", result);
      toast.success("Транзакция отправлена!", { id: notif });
    } catch (e) {
      console.error(e);
      toast.error("Ошибка транзакции", { id: notif });
    }
  };

  return (
    <button onClick={sendTest} className="px-6 py-2 bg-green-600 text-white rounded">
      Test 0.001 TON
    </button>
  );
}
  */
