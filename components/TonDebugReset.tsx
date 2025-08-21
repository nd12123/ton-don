// components/TonDebugReset.tsx
"use client";
import { useEffect } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";

export default function TonDebugReset() {
  const [ui] = useTonConnectUI();
  useEffect(() => {
    ui.disconnect().catch(() => {});
    // localStorage.removeItem('ton-connect-ui');  // обычно ui.disconnect достаточно
  }, [ui]);
  return null;
}
