// lib/hooks/useStakeContract.ts
"use client";

import { useEffect, useState } from "react";
import { Address, toNano, fromNano, OpenedContract } from "@ton/core";
import type {
  AddStake,
  WithdrawAmount,
  Drain
  //SetAdmin noneed
} from "../../build/LastContract/LastContract_LastContract"; //... /StakeContract/StakeContract_StakeContract
//import {StakeContract} from "../../build/StakeContract/StakeContract_StakeContract"
import { LastContract }     from "../../build/LastContract/LastContract_LastContract"; //... /StakeContract/StakeContract_StakeContract

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
  const [admin,      setAdminAddr]    = useState<string | null>(null); //

  // 1) Открываем контракт
  const contract = useAsyncInitialize<OpenedContract<LastContract> | null>(
    async () => {
      if (!client || !wallet) return null;
      console.log("Contract opening, wallet ", Address.parse(wallet as string).toString(), " contract ", "kQCaADFW83YrbuXUg6OCN1zvt77rEe-ZMCToJqv2sxhB-Kh0") //Address.parse() //kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz
      const desc = LastContract.fromAddress(
        Address.parse("kQCaADFW83YrbuXUg6OCN1zvt77rEe-ZMCToJqv2sxhB-Kh0")//") // EQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFsmj5 //contractAddress //"kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz")//"0QAmQUOW2aGZb8uGmDd8fhhcs7u5NpzzmybooQo46PzGleIL")//"EQB8akzBYXBpATjJiWG1vRwo2FG2JoA9czy3yNno-qhMnlMo") //process.env.NEXT_PUBLIC_ADMIN_WALLETS ? can be a string? maybe log
      );
      return client.open(desc) as OpenedContract<LastContract>;
    },
    [client, wallet] //contractAddress c209edecebfe1050d45bb01b898c1f518df5f7448cf6345c00811822db4c5dca ?
  );

  // 2) Загружаем данные один раз при монтировании
  useEffect(() => {
    async function fetchData() {
      if (!contract || !sender.address) return;
      const total = await contract.getTotalStaked();
      //const admin = await contract.getUserStake(sender.address)//getContractAdmin(); //!!

      
    // посмотрите, какие методы доступны на объекте
    //console.log('contract keys:', Object.keys(contract));
    //console.log('getContractAdmin type:', typeof (contract).getContractAdmin);
/* try {
      const raw = await contract.get('contractAdmin');
      const adminAddr = raw.stack.readAddress();
      console.log('admin via low-level get:', adminAddr.toString());
    } catch (e) {
      console.warn('low-level get failed:', e);
    }
      */

      //console.log("✅ contract is ready, address:", contract.address.toString(), " User stake (gon be Admin) ", admin); //.toString()
      //console.log("Contract keys:", Object.keys(contract));

      //setAdminAddr(admin.toString())
      setTotalStaked(total);
      //console.log('Total ',total)
      const stake = await contract.getUserStake(sender.address);
      setUserStake(stake ?? 0n);
    }
    fetchData();
  }, [contract, sender.address]);

// 3) fetch admin as soon as contract is ready
/*
*/

  useEffect(() => {
    if (!contract || !client) return;

    /*
*/
    (async () => {
  const desc = LastContract.fromAddress(
    Address.parse("kQCaADFW83YrbuXUg6OCN1zvt77rEe-ZMCToJqv2sxhB-Kh0")//"kQB3u_BlKZsMEHsz9GFwJfUY7lG7xlzKdil8yUwqEIFFstNz") kQCaADFW83YrbuXUg6OCN1zvt77rEe-ZMCToJqv2sxhB-Kh0 kQDexuQg5a-vyelfStMMax7ODr8Yc-l_epdqiKuBVNH1p1DP
  );
  const opened = client.open(desc);
  //console.log("Contract keys by address:", Object.keys(opened));
  //console.log("Contract keys by object", Object.keys(contract));
  const owner = await opened.getAdmin();
  console.log("Admin is:", owner.toString());
})();


    (async () => {
      const a = await contract.getOwner();//getContractAdmin(); (provider:  ContractProvider)
      setAdminAddr(a.toString());
      console.log("!Owner ", a.toString())
    })();
    //    fetchData();
  }, [contract]);

  // 3) Метод стейка
  
  const stakeTon = async (amount: number) => {
    console.log('preparing to stake ', amount)

    if (!contract){ console.log("Contract not deployed"); return};
    const msg: AddStake = {
      $$type: "AddStake",
      amount: BigInt(amount),
    };
    //console.log('ready to stake ', amount, msg, sender.address)

    console.log('Amount in msg ', BigInt(amount), ' Value sent ', toNano('1.05') )
    await contract.send(
      sender,
      { 
        value: toNano('1.05') 
      }, // toNano(amount.toString()) + gasBuffer 
      {
      $$type: "AddStake",
      amount: BigInt(amount),
      }
    );
    console.log('staking ', fromNano(toNano(amount.toString())) + gasBuffer , ' TON', msg)
    // можно вызвать fetchData(), если нужно сразу обновить UI
  };
  
  // 5) setAdmin — only callable by current admin
  /*
  const setAdmin = async (newAdmin: string) => {
    if (!contract) throw new Error("contract not ready");
    await contract.send(
      sender,
      { value: toNano("0.05") },
      { $$type: "SetAdmin", admin: Address.parse(newAdmin) } as SetAdmin
    );
    setAdminAddr(newAdmin);
  };
  */

  // 4) Метод вывода
  const withdrawTon = async (amount: number, target: string) => {
    if (!contract) return;
    const msg: WithdrawAmount = {
      $$type: "WithdrawAmount",
      amount: 1n,//toNano(0.01),//BigInt(amount),
      //target: Address.parse(target),
    };
    await contract.send(
      sender,
      { value: toNano(0.04) },
      msg
    );
    console.log("Withdraw pressed", amount, target, contract, sender);
    // можно вызвать fetchData() здесь тоже
  };

  const drain = async (target: string) => {
    if (!contract) return;
    const msg: Drain = {
      $$type: "Drain",
      target: Address.parse(target),
    }
    await contract.send(
      sender,
      { value: toNano("0.03") },
      msg
    );
        console.log("Draining", target, contract, sender);
  }

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
    drain,
    admin

/*
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

  */
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