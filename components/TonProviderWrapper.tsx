"use client"

import { TonConnectUIProvider } from "@tonconnect/ui-react"
import { useEffect, useState } from "react"

export function TonProviderWrapper({ children }: { children: React.ReactNode }) {
  const [returnUrl, setReturnUrl] = useState<`${string}://${string}` | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href
      if (url.startsWith("http://") || url.startsWith("https://")) {
        setReturnUrl(url as `${string}://${string}`)
      }
    }
  }, [])

  return (
    <TonConnectUIProvider
      manifestUrl="https://staking-mocha-iota.vercel.app/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: returnUrl,
      }}
    >
      {children}
    </TonConnectUIProvider>
  )
}

