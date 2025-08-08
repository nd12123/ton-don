"use client";

import { useEffect, useState } from "react";
import { Address, TupleBuilder } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

export function useStakeAdmin() {
  const { client } = useTonClient();       // TonClient
  const { wallet } = useTonConnect();      // чтобы дождаться коннекта, если надо
  const [admin, setAdmin] = useState<Address | null>(null);

  useEffect(() => {
    if (!client) return;

    const run = async () => {
      try {
        const addr = Address.parse("kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz");

        // 1) Берём провайдера у клиента по адресу контракта
        const provider = client.provider(addr);

        // 2) Вызываем системный get-метод по имени из контракта: 'owner'
        const res = await provider.get("owner", new TupleBuilder().build());

        // 3) Читаем результат
        const owner = res.stack.readAddress();
        setAdmin(owner);
      } catch (e) {
        console.error("❌ Failed to fetch admin:", e);
        setAdmin(null);
      }
    };

    run();
  }, [client, wallet]); // wallet по желанию

  return admin;
}
