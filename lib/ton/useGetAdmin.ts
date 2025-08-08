"use client";

import { useEffect, useState } from "react";
import { Address, TupleBuilder } from "@ton/core";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

const CONTRACT = "kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz";

export function useGetAdmin() {
  const { client } = useTonClient();
  const { wallet } = useTonConnect();

  const [admin, setAdmin] = useState<string | null>(null);
  const [totalStaked, setTotalStaked] = useState<bigint>(0n);
  const [userStake, setUserStake] = useState<bigint>(0n);

  useEffect(() => {
    if (!client) return;

    (async () => {
      try {
        const provider = client.provider(Address.parse(CONTRACT));

        // admin
        const resAdmin = await provider.get("owner", new TupleBuilder().build());
        setAdmin(resAdmin.stack.readAddress().toString());

        // total staked
        const resTotal = await provider.get("total_staked", new TupleBuilder().build());
        setTotalStaked(resTotal.stack.readBigNumber());

        // user stake — если есть подключённый кошелёк
        if (wallet) {
          const tb = new TupleBuilder();
          tb.writeAddress(Address.parse(wallet));
          const resUser = await provider.get("user_stake", tb.build());
          setUserStake(resUser.stack.readBigNumber());
        }
      } catch (e) {
        console.error("❌ Failed to fetch stake data:", e);
      }
    })();
  }, [client, wallet]);

  return { admin, totalStaked, userStake };
}
