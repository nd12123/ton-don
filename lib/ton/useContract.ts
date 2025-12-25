// lib/hooks/useStakeContract.ts
"use client";

import { useEffect, useState } from "react";
import { Address, toNano, fromNano, OpenedContract } from "@ton/core";
import type {
  AddStake,
  WithdrawAmount,
  Withdraw,
  Drain
  //SetAdmin noneed
} from "../../build/MainContract/MainContract_MainContract"; //... /StakeContract/StakeContract_StakeContract
//import {StakeContract} from "../../build/StakeContract/StakeContract_StakeContract"
import { MainContract }     from "../../build/MainContract/MainContract_MainContract"; //... /StakeContract/StakeContract_StakeContract

import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient }       from "./useTonClient";
import { useTonConnect }      from "./useTonConnect";
//import { number } from "framer-motion";


export function useStakeContract() { //contractAddress: string
  const { client } = useTonClient();      // TonClient для чтения
  const { wallet, sender } = useTonConnect(); // TonConnectUI sender

    const gasBuffer = toNano("0.04");                    // 0.05 TON for gas+storage

  
  const [totalStaked, setTotalStaked] = useState<bigint>(0n);
  const [userStake,   setUserStake]   = useState<bigint>(0n);
  const [owner,      setOwner]    = useState<string | null>(null); //

  // 1) Открываем контракт
  const contract = useAsyncInitialize<OpenedContract<MainContract> | null>(
    async () => {
      if (!client || !wallet) return null;
      // OLD HARDCODED: "kQCaADFW83YrbuXUg6OCN1zvt77rEe-ZMCToJqv2sxhB-Kh0"
      const contractAddr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      if (!contractAddr) {
        console.error("NEXT_PUBLIC_CONTRACT_ADDRESS not set");
        return null;
      }
      const desc = MainContract.fromAddress(Address.parse(contractAddr));
      return client.open(desc) as OpenedContract<MainContract>;
    },
    [client, wallet]
  );

  // 2) Загружаем данные один раз при монтировании
  useEffect(() => {
    async function fetchData() {
      if (!contract || !sender.address) return;
      //const total = await contract.getTotalStaked();
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
      //setTotalStaked(total);
      //console.log('Total ',total)
      //const stake = await contract.getUserStake(sender.address);
      //setUserStake(stake ?? 0n);
    }
    fetchData();
  }, [contract, sender.address]);

// 3) fetch admin as soon as contract is ready
/*
*/

  useEffect(() => {
    if (!contract || !client) return;
    // OLD SECOND ADDRESS (commented out): "UQDYE_8_ESdxLvbAKV2Y08LStu1CYaAMfhBNrreEHtUbbTtp"
    (async () => { //Contract owner
      const a = await contract.getOwner();//getContractAdmin(); (provider:  ContractProvider)
      setOwner(a.toString());
      console.log("!Owner ", a.toString())
    })();
    //    fetchData();
  }, [contract]);

  // 3) Метод стейка
  // 3) Метод стейка — подтверждение через await contract.send(...)
const stakeTon = async (amount: number): Promise<string> => {
  console.log("preparing to stake", amount);

  if (!contract) {
    console.log("Contract not deployed");
    throw new Error("CONTRACT_NOT_READY");
  }

  // сообщение для контракта
  const msg: AddStake = {
    $$type: "AddStake",
    amount: BigInt(amount),
  };

  // сколько реально уходит (стейк + буфер на газ/сторадж)
  const value = toNano(amount.toString()) + gasBuffer;

  console.log(
    "Amount in msg",
    BigInt(amount),
    " Value sent ",
    value
  );

  try {
    // ВАЖНО: эта строка резолвится ТОЛЬКО если пользователь подтвердил транзакцию
    // и TonConnect-сендер успешно её отдал кошельку.
    await contract.send(
      sender,
      { value }, // можно добавить bounce/sendMode при необходимости
      msg
    );

    console.log("staking", fromNano(value), "TON", msg);

    // Возвращаем маркер успешного подтверждения.
    // (Если тебе нужно строго строковое значение для onConfirm(txHash:string),
    //  можно вернуть, например, "confirmed".)
    return "confirmed";
  } catch (e: any) {
    // Пользователь отменил или кошелёк/сендер вернул ошибку.
    // Логика: кидаем дальше, чтобы модалка показала ошибку и НЕ писала запись.
    const msg = typeof e?.message === "string" ? e.message : String(e);
    console.error("🔴 [stakeTon] send cancelled/failed:", msg);
    // Можешь пробросить "USER_REJECTED" для удобной обработки в UI:
    if (/reject|cancel/i.test(msg)) {
      throw new Error("USER_REJECTED");
    }
    throw e;
  }
};

  /*
  const stakeTon = async (amount: number) => {
    console.log('preparing to stake ', amount)

    if (!contract){ console.log("Contract not deployed"); return};
    const msg: AddStake = {
      $$type: "AddStake",
      amount: BigInt(amount),
    };
    //console.log('ready to stake ', amount, msg, sender.address)

    console.log('Amount in msg ', BigInt(amount), ' Value sent ', toNano(amount.toString()) + gasBuffer )
    await contract.send(
      sender,
      { 
        value: toNano(amount.toString()) + gasBuffer //toNano('1.05') 
      }, // toNano(amount.toString()) + gasBuffer 
      {
      $$type: "AddStake",
      amount: BigInt(amount),
      }
    );
    console.log('staking ', fromNano(toNano(amount.toString()) + gasBuffer) , ' TON', msg)
    // можно вызвать fetchData(), если нужно сразу обновить UI
  };
  */
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
// 4) Метод вывода на адрес
const withdrawTarget = async (amount: number, target: string) => {
  if (!contract || !sender) return;
  if (!target) return;
  if (amount <= 0) return;

  // контракт ждёт целые TON в uint32 → без toNano!
  const msg: Withdraw = {
    $$type: "Withdraw",
    amount: BigInt(Math.floor(amount)),
    target: Address.parse(target),
  };

  await contract.send(
    sender,
    { value: gasBuffer },   // только газ/сторадж
    msg
  );

  console.log("Target withdraw", amount, target);
};

const withdrawAmount = async (amount: number) => {
  if (!contract || !sender) return;
  if (amount <= 0) return;

  // тоже без toNano
  const msg: WithdrawAmount = {
    $$type: "WithdrawAmount",
    amount: BigInt(Math.floor(amount)),
  };

  await contract.send(
    sender,
    { value: gasBuffer },
    msg
  );

  console.log("Withdraw", amount);
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
    withdrawTarget,
    withdrawAmount,
    drain,
    owner

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