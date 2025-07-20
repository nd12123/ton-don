"use client"
//set if the user is Admin
import { useEffect, useState, useRef } from "react"
import { useTonAddress } from "@tonconnect/ui-react"

export function useUserRole() {
  const wallet = useTonAddress()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  const hasInitialized = useRef(false)
  const previousWallet = useRef<string | null>(null)

  useEffect(() => {
    //const adminWallet = process.env.NEXT_PUBLIC_ADMIN_WALLET?.toLowerCase()
    const admins = (process.env.NEXT_PUBLIC_ADMIN_WALLETS || "").split(",");
    if (!wallet || wallet === "") {
      // но если уже был адрес, не сбрасываем резко стейт
      if (!hasInitialized.current) {
        setIsLoggedIn(false)
        setIsAdmin(false)
      }
      return
    }

    // если ничего не поменялось — не трогаем
    if (previousWallet.current === wallet && hasInitialized.current) return

    previousWallet.current = wallet
    hasInitialized.current = true

    //const currentWallet = wallet.toLowerCase() //currentWallet === adminWallet
    setIsLoggedIn(true)
    setIsAdmin(admins.includes(wallet)) 
    console.log( )
  }, [wallet])

  const isLoading = isAdmin === null || isLoggedIn === null

  return { // has to be TTF to go through
    isAdmin,
    isLoggedIn,
    isLoading,
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