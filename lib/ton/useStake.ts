// lib/hooks/useStakeContract.ts
/*
"use client";

import { useEffect, useState } from "react";
import { Address, toNano, OpenedContract } from "@ton/core";
import {
  StakeContract,
  AddStake,
  Withdraw,
} from "../../wrappers/StakeContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
//import { useTonProvider } from "./useTonProvider";
import { NetworkProvider } from '@ton/blueprint';

//import { TonConnectUIProvider } from "@tonconnect/ui-react" //CHAIN

export function useStakeContract(contractAddress: string) {
  const provider = useTonProvider();
  const [contract, setContract] = useState<OpenedContract<StakeContract> | null>(null);
  const [total, setTotal] = useState<bigint>(0n);
  const [user, setUser] = useState<bigint>(0n);

  // 1) open the contract once provider is ready
  useEffect(() => {
    if (!provider) return;
    (async () => {
      const desc = StakeContract.fromAddress(Address.parse(contractAddress));
      setContract(await provider.open(desc));
    })();
  }, [provider, contractAddress]);

  // 2) fetch getters
  useEffect(() => {
    if (!contract) return;
    (async () => {
      setTotal(await contract.getTotalStaked());
      setUser((await contract.getUserStake(await provider.sender().address!)) ?? 0n);
    })();
  }, [contract, provider]);

  // 3) stake
  const stake = async (amount: number) => {
    if (!contract) throw new Error("contract not ready");
    // build the body cell
    const cell = AddStake.toCell({ $$type: "AddStake", amount: BigInt(amount) });
    const boc = cell.toBoc().toString("base64");
    const value = toNano(amount.toString()).toString();

    await provider.sender().send({
      validUntil: Math.floor(Date.now() / 1000) + 60 * 5,
      messages: [
        {
          address: contract.address.toString(),
          amount: value,
          payload: boc,
        },
      ],
    });
    // then re-fetch if you like
    setTotal(await contract.getTotalStaked());
    setUser((await contract.getUserStake(await provider.sender().address!)) ?? 0n);
  };

  return { total, user, stake };
}
  */
