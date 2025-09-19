"use client";
import * as React from "react";
import { useTonConnectUI, useTonWallet, CHAIN } from "@tonconnect/ui-react";

export default function AdminLoginButton() {
  const [ui] = useTonConnectUI();
  const wallet = useTonWallet();

  const login = React.useCallback(async () => {
    // 1) Берём nonce
    const r = await fetch("/api/ton-proof/nonce", { cache: "no-store" });
    if (!r.ok) {
      console.error("nonce failed", await r.text());
      return;
    }
    const { nonce } = await r.json();

    // 2) Готовим запрос ton_proof для следующего подключения
    ui.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: nonce },
    });

    // 3) Если НЕ подключен — открываем модалку один раз
    if (!wallet) {
      await ui.openModal();
    }

    // 4) Обновляем ссылку на кошелёк (после модалки мог появиться)
    let w = wallet ?? (await new Promise<typeof wallet>((res) => {
      // небольшой трюк: ждём один тик, чтобы ui-react обновил useTonWallet()
      setTimeout(() => res((window as any).__tonWallet || null), 0);
    })) ?? wallet;

    // 5) Пытаемся взять текущий proof
    let proof = (w as any)?.connectItems?.tonProof?.proof;

    // Если подключен, но proof на этот nonce не выдали — делаем мягкий ре-логин
    if (w && !proof?.payload) {
      await ui.disconnect();
      // заново попросим ton_proof и откроем модалку
      ui.setConnectRequestParameters({ state: "ready", value: { tonProof: nonce } });
      await ui.openModal();
      // после переподключения читаем свежий wallet из хука на следующий тик
      await new Promise((r) => setTimeout(r, 0));
      w = (window as any).__tonWallet || w;
      proof = (w as any)?.connectItems?.tonProof?.proof;
    }

    const address = w?.account?.address;
    const chain = w?.account?.chain;
    const network = chain === CHAIN.MAINNET ? "mainnet" : "testnet";

    if (!address || !proof?.payload) {
      console.error("no proof or address", { hasAddr: !!address, hasPayload: !!proof?.payload });
      return;
    }

    // 6) Верификация на сервере
    const v = await fetch("/api/ton-proof/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ address, network, proof }),
    });

    const data = await v.json().catch(() => ({}));
    if (!v.ok) {
      console.error("verify failed", v.status, data);
      return;
    }

    if (data.admin) {
      location.reload();
    } else {
      alert("Этот адрес не входит в список админов");
    }
  }, [ui, wallet]);

  return (
    <button
      type="button"
      onClick={login}
      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20"
    >
      Войти как админ
    </button>
  );
}
