// lib/hooks/useStakeContract.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { Address, OpenedContract, toNano } from "@ton/core";
import {
  StakeContract,
  AddStake,
  Withdraw,
} from "../../build/StakeContract/StakeContract_StakeContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient }         from "./useTonClient";
import { useTonConnect }        from "./useTonConnect";

export function useStakeContract(contractAddress: string) {
  const { client }   = useTonClient();
  const { sender }   = useTonConnect();
  const [total, setTotal]   = useState<bigint>(0n);
  const [user,  setUser]    = useState<bigint>(0n);

  // инициализируем контракт
  const contract = useAsyncInitialize<OpenedContract<StakeContract> | null>(
    async () => {
      if (!client) return null;
      const desc = StakeContract.fromAddress(Address.parse(contractAddress));
      return client.open(desc) as OpenedContract<StakeContract>;
    },
    [client, contractAddress]
  );

  // единая функция обновления стейков
  const refresh = useCallback(async () => {
    if (!contract) return;
    const t = await contract.getTotalStaked();
    setTotal(t);
    const u = await contract.getUserStake(sender.address!);
    setUser(u ?? 0n);
  }, [contract, sender.address]);

  // однократно после подключения контракта
  useEffect(() => {
    refresh();
  }, [refresh]);

  // функция стейка
  const stakeTon = useCallback(
    async (amount: number) => {
      if (!contract) return;
      const msg: AddStake = {
        $$type: "AddStake",
        amount: BigInt(amount),
      };
      await contract.send(
        sender,
        { value: toNano(amount.toString()) },
        msg
      );
      // после успешного стейка подхватываем новое значение
      await refresh();
    },
    [contract, sender, refresh]
  );

  // функция вывода
  const withdrawTon = useCallback(
    async (amount: number, target: string) => {
      if (!contract) return;
      const msg: Withdraw = {
        $$type: "Withdraw",
        amount: BigInt(amount),
        target: Address.parse(target),
      };
      await contract.send(
        sender,
        { value: toNano("0.03") },
        msg
      );
      // после вывода обновляем общий стейк
      await refresh();
    },
    [contract, sender, refresh]
  );

  return {
    totalStaked: total,
    userStake:   user,
    refresh,     // на всякий вручную
    stakeTon,
    withdrawTon,
  };
}
