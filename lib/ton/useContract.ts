// lib/hooks/useStakeContract.ts
"use client";

import { useEffect, useState } from "react";
import { Address, toNano, OpenedContract } from "@ton/core";
import {
  StakeContract,
  AddStake,
  Withdraw,
} from "../../build/StakeContract/StakeContract_StakeContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient }       from "./useTonClient";
import { useTonConnect }      from "./useTonConnect";
import { number } from "framer-motion";

export function useStakeContract(contractAddress: string) {
  const { client } = useTonClient();      // TonClient для чтения
  const { wallet, sender } = useTonConnect(); // TonConnectUI sender
  
  const [totalStaked, setTotalStaked] = useState<bigint>(0n);
  const [userStake,   setUserStake]   = useState<bigint>(0n);

  // 1) Открываем контракт
  const contract = useAsyncInitialize<OpenedContract<StakeContract> | null>(
    async () => {
      if (!client || !wallet) return null;
      const desc = StakeContract.fromAddress(
        Address.parse(contractAddress)
      );
      return client.open(desc) as OpenedContract<StakeContract>;
    },
    [client, wallet, contractAddress]
  );

  // 2) Загружаем данные один раз при монтировании
  useEffect(() => {
    async function fetchData() {
      if (!contract || !sender.address) return;
      const total = await contract.getTotalStaked();
      setTotalStaked(total);
      const stake = await contract.getUserStake(sender.address);
      setUserStake(stake ?? 0n);
    }
    fetchData();
  }, [contract, sender.address]);

  // 3) Метод стейка
  const stakeTon = async (amount: number) => {
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
    console.log('staking ', number, msg)
    // можно вызвать fetchData(), если нужно сразу обновить UI
  };

  // 4) Метод вывода
  const withdrawTon = async (amount: number, target: string) => {
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
    // можно вызвать fetchData() здесь тоже
  };

  return {
    totalStaked,
    userStake,
    stakeTon,
    withdrawTon,
  };
}
