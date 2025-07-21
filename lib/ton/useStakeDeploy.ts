// lib/ton/useStakeDeploy.ts
"use client";

import {  toNano } from "@ton/core"; //beginCell,
import { useTonConnectUI }   from "@tonconnect/ui-react";
import { StakeContract }     from "../../build/StakeContract/StakeContract_StakeContract";

export function useStakeDeploy() {
  const [tonConnectUI] = useTonConnectUI();

  const deploy = async () => {
    // 1) get code/data/address
    const initDesc = await StakeContract.fromInit();
    //console.log('deploying a contract')
    // 2) build the single stateInit cell
    /*
    const stateInitCell = beginCell()
      .storeRef(initDesc.code!)  // code is non-null
      .storeRef(initDesc.data!)  // data is non-null
      .endCell();
*/
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
