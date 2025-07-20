// lib/hooks/useStakeContract.ts
/*
"use client";
import { useState, useEffect, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { createNetworkProvider } from "@ton/blueprint";
import { StakeContract } from "../../build/StakeContract/StakeContract_StakeContract";
import { toNano } from "@ton/core";

export function useStakeContract() {
  const [tonConnectUI] = useTonConnectUI();
  const [provider, setProvider] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);

  // Инициализируем provider и контракт
  useEffect(() => {
    (async () => {
      if (!tonConnectUI) return;
      const prov = await createNetworkProvider(
        tonConnectUI,
        { endpoint: process.env.NEXT_PUBLIC_TON_RPC_URL! },
        undefined,
        true
      );
      const deployDesc = await StakeContract.fromInit(
        //prov.sender().address
      );
      const ctr = prov.open(deployDesc);
      setProvider(prov);
      setContract(ctr);
    })();
  }, [tonConnectUI]);

  const [totalStaked, setTotal] = useState<bigint>(0n);
  const [userStake, setUserStake] = useState<bigint>(0n);

  const refresh = useCallback(async () => {
    if (!contract) return;
    setTotal(await contract.getTotalStaked());
    setUserStake((await contract.getUserStake(provider.sender().address)) ?? 0n);
  }, [contract, provider]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const stake = useCallback(
    (amount: number) =>
      contract.send(
        provider.sender(),
        { value: toNano(amount.toString()) },
        { $$type: "AddStake", amount: BigInt(amount) }
      ),
    [contract, provider]
  );

  return { totalStaked, userStake, refresh, stake };
}
  */
