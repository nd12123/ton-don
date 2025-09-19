'use client';

import { useState } from 'react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useRouter } from 'next/navigation';

export default function LoginGate() {
  const [busy, setBusy] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const router = useRouter();

  const login = async () => {
    setBusy(true);
    try {
      // 1) берём nonce с бэка
      const resp = await fetch('/api/ton-proof/nonce');
      if (!resp.ok) throw new Error('nonce failed');
      const { nonce } = await resp.json();

      // 2) сообщаем UI, что на подключении нужен tonProof
      await tonConnectUI.setConnectRequestParameters({
        state: 'ready',
        value: { tonProof: nonce },
      });

      // 3) если не подключён — открываем кошельки; если уже подключён — попросим переподключение для выдачи proof
      if (!wallet) {
        await tonConnectUI.openModal();
      } else {
        // большинство кошельков вернут новый proof только при новом connect
        await tonConnectUI.disconnect();
        await tonConnectUI.openModal();
      }

      // 4) после подключения proof лежит тут:
      const w = tonConnectUI.connector.wallet as any;
      const proof = w?.connectItems?.tonProof;
      const address =
        w?.account?.address || wallet?.account?.address;

      if (!proof || !address) throw new Error('no proof or address');

      // 5) верифицируем на сервере (установит cookie/сессию)
      const verify = await fetch('/api/ton-proof/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proof, account: { address } }),
      });
      const data = await verify.json();
      if (!verify.ok || !data.ok) throw new Error(data?.error || 'verify failed');

      router.refresh();
    } catch (e) {
      console.error(e);
      alert('Не удалось войти как админ');
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={login}
      disabled={busy}
      className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold disabled:opacity-60"
    >
      {busy ? 'Проверяем…' : 'Войти как админ'}
    </button>
  );
}
