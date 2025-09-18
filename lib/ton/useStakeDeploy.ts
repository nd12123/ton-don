// lib/ton/useStakeDeploy.ts
/*
"use client";

import {  toNano } from "@ton/core"; //beginCell,
import { useTonConnectUI }   from "@tonconnect/ui-react";
import { LastContract }     from "../../build/LastContract/LastContract_LastContract"; //... /StakeContract/StakeContract_StakeContract

export function useStakeDeploy() {
  const [tonConnectUI] = useTonConnectUI();

  const deploy = async () => {
    // 1) get code/data/address
    const initDesc = await LastContract.fromInit();
    //console.log('deploying a contract')
    // 3) serialize to Base64
    //const stateInitBoc = stateInitCell.toBoc().toString("base64");

    // 4) send deploy message
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 600, // 10min TTL
      messages: [
        {
          address: initDesc.address.toString(),      // contract will live here
          amount:  toNano("0.05").toString(),        // 0.05 TON
          //stateInit: stateInitBoc,                   // <<< required!
          // payload must be omitted, not `null`
        },
      ],
    });
  };

  return { deploy };
}
*/