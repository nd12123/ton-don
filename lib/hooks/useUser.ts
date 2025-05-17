"use client"

import { useEffect, useState } from "react"
import { useTonAddress } from "@tonconnect/ui-react"

export function useUserRole() {
  const wallet = useTonAddress()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    // если кошелёк не подключен
    if (!wallet || wallet === "") {
      setIsLoggedIn(false)
      setIsAdmin(false)
      return
    }

    const adminWallet = process.env.NEXT_PUBLIC_ADMIN_WALLET?.toLowerCase()
    const currentWallet = wallet.toLowerCase()

    setIsLoggedIn(true)
    setIsAdmin(adminWallet === currentWallet)
  }, [wallet])

  return {
    isAdmin,
    isLoggedIn,
    isLoading: isAdmin === null || isLoggedIn === null,
  }
}
/*
const address = useTonAddress() || "";
  const admins = (process.env.NEXT_PUBLIC_ADMIN_WALLETS || "").split(",");
  return {
    address,
    isAdmin: admins.includes(address),
    isLoggedIn: address !== "",
  };
*/