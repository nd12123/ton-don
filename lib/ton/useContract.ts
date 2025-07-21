// lib/hooks/useStakeContract.ts
"use client";

import { useEffect, useState } from "react";
import { Address, toNano, fromNano, OpenedContract } from "@ton/core";
import {
  StakeContract,
  AddStake,
  Withdraw,
} from "../../build/StakeContract/StakeContract_StakeContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient }       from "./useTonClient";
import { useTonConnect }      from "./useTonConnect";
//import { number } from "framer-motion";

export function useStakeContract() { //contractAddress: string
  const { client } = useTonClient();      // TonClient для чтения
  const { wallet, sender } = useTonConnect(); // TonConnectUI sender

    const gasBuffer = toNano("0.08");                    // 0.05 TON for gas+storage

  
  const [totalStaked, setTotalStaked] = useState<bigint>(0n);
  const [userStake,   setUserStake]   = useState<bigint>(0n);

  // 1) Открываем контракт
  const contract = useAsyncInitialize<OpenedContract<StakeContract> | null>(
    async () => {
      if (!client || !wallet) return null;
      console.log("Contract opening, wallet ", Address.parse(wallet as string).toString(), " contract ", Address.parse("kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz"))
      const desc = StakeContract.fromAddress(
        Address.parse("EQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFsmj5")//kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz") //contractAddress //"kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz")//"0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL")//"EQB8akzBYXBpATjJiWG1vRwo2FG2JoA9czy3yNno-qhMnlMo") //process.env.NEXT_PUBLIC_ADMIN_WALLETS ? can be a string? maybe log
      );
      return client.open(desc) as OpenedContract<StakeContract>;
    },
    [client, wallet] //contractAddress c209edecebfe1050d45bb01b898c1f518df5f7448cf6345c00811822db4c5dca ?
  );

  // 2) Загружаем данные один раз при монтировании
  useEffect(() => {
    async function fetchData() {
      if (!contract || !sender.address) return;
      const total = await contract.getTotalStaked();
      console.log("✅ contract is ready, address:", contract.address.toString());

      setTotalStaked(total);
      console.log('Total ',total)
      const stake = await contract.getUserStake(sender.address);
      setUserStake(stake ?? 0n);
    }
    fetchData();
  }, [contract, sender.address]);

  // 3) Метод стейка
  
  const stakeTon = async (amount: number) => {
    console.log('preparing to stake ', amount)

    if (!contract){ console.log("Contract not deployed"); return};
    const msg: AddStake = {
      $$type: "AddStake",
      amount: BigInt(amount),
    };
    console.log('ready to stake ', amount, msg, sender.address)


    await contract.send(
      sender,
      { value: toNano(amount.toString()) + gasBuffer },
      msg
    );
    console.log('staking ', fromNano(toNano(amount.toString())) + gasBuffer , ' TON', msg)
    // можно вызвать fetchData(), если нужно сразу обновить UI
  };
  


  /*
  // 2) Метод стейка через TonConnectUI
  const stakeTon = async (amount: number) => {
    if (!contract) {
      console.error("Contract not ready");
      return;
    }

    // build the message object, then cell → BOC
    const msgObj = { $$type: "AddStake", amount: BigInt(amount) } as AddStake;
    const cell = AddStake.toCell(msgObj);
    const payload = cell.toBoc({ idx: false }).toString("base64");

    // we add a small buffer for gas/storage
    const gasBuffer = toNano("0.05");
    const value = toNano(amount.toString()) + gasBuffer;

    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 5 * 60, // in seconds
      messages: [
        {
          address: contractAddress,
          amount:  value.toString(),  // <— must be string
          payload,                    // <— base64 payload
        },
      ],
    });
  };
*/
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
        contractAddress: contract?.address.toString(),
    //connected: connected,
    /*
    contractAddress: contract?.address.toString(),
    */
    totalStaked,
    userStake,
    stakeTon,
    withdrawTon,


    stakeScript: (amount: number) =>{
    console.log('preparing to stake ', amount)
    if (!contract){ console.log("Contract not deployed"); return};
    const msg: AddStake = {
      $$type: "AddStake",
      amount: BigInt(amount),
    };
    console.log('ready to stake ', amount, msg, sender.address)

    contract.send(
      sender,
      { value: toNano(amount.toString()) + gasBuffer,
        //sendMode: 3 value only(
       },
      msg
    );
    console.log('staking ', fromNano(toNano(amount.toString())) + gasBuffer , ' TON', msg)
    // можно вызвать fetchData(), если нужно сразу обновить UI
  }
            /*
    mint: () => {
            const message = {
                $$type: "Mint",
                amount: 150n
            }
            StakeContract?.send(sender, {
                value: toNano("0.05")
            }, message)
        }
            */
      
    /*
    staker: () => {
      const message ={
        $$type: 'Stake',
        amount: 1n,

      }
      StakeContract?.(sender, {
                value: toNano("0.05")
            }, message) //send
    }
            */
  };
}



/*
   const jettonContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const contract = StakeContract.fromAddress(Address.parse("EQB8akzBYXBpATjJiWG1vRwo2FG2JoA9czy3yNno-qhMnlMo")) //

        return client.open(contract) as OpenedContract<StakeContract>
    }, [client, wallet])
  const jettonWalletContract = useAsyncInitialize(async()=>{
        if(!jettonContract || !client) return;

        const jettonWalletAddress = await jettonContract.getGetWalletAddress(
            Address.parse(Address.parse(wallet!).toString())
        )

        return client.open(JettonDefaultWallet.fromAddress(jettonWalletAddress))
    }, [jettonContract, client])
*/