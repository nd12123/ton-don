"use client";
import { Jetton } from "@/components/Jetton";
import { Button } from "@/components/ui/button";

import { FlexBoxCol, FlexBoxRow } from "../../../components/styled/styled";
import {TonConnectButton, CHAIN } from "@tonconnect/ui-react"
import { useTonConnect } from "@/lib/ton/useTonConnect";
import { Address } from "@ton/core";

import { RequireAdmin } from "@/components/RequireAdmin"

export default function AdminPage(){
      const {network, wallet} = useTonConnect()

    return(
        <RequireAdmin>
                <FlexBoxCol>
                  <FlexBoxRow>
                    <TonConnectButton/>
                    <Button>
                      {network
                        ? network === CHAIN.MAINNET
                          ? "mainnet"
                          : "testnet"
                        : "N/A"}
                    </Button>
                    <Button>
                      {wallet
                          ? Address.parse(wallet as string).toString()
                        : "N/A"}
                    </Button>
                  </FlexBoxRow>
                  <Jetton />
                  {/*<StakePanel />*/}
                </FlexBoxCol>
        </RequireAdmin>
    )
}