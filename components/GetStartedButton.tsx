"use client";

import { useTonConnectUI } from "@tonconnect/ui-react";
import { Button } from "@/components/ui/button";

export default function GetStartedButton() {
  const [tonConnectUI] = useTonConnectUI();

  const handleClick = () => {
    if (!tonConnectUI.connector) {
      console.error("TonConnect connector is not initialized");
      return;
    }
    // здесь именно у connector есть метод connect()
    //tonConnectUI.connector.connect();
  };

  return (
    <div className="text-center">
      <Button
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl" //bg-blue-600 hover:bg-blue-700
        onClick={handleClick}
      >
        Get Started Now
      </Button>
    </div>
  );
}
