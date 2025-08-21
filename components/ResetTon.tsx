// components/ResetTon.tsx
'use client';
import { useTonConnectUI } from '@tonconnect/ui-react';

export default function ResetTon() {
  const [ui] = useTonConnectUI();
  return (
    <button
      onClick={async () => {
        try { await ui.disconnect(); } catch {}
        for (const k of ['ton-connect-ui', 'ton-connect', 'ton-connect-storage']) {
          try { localStorage.removeItem(k); } catch {}
        }
        location.reload();
      }}
      className="text-xs text-red-500"
    >
      Reset TonConnect
    </button>
  );
}
