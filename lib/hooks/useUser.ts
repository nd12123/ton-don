// lib/hooks/useUser.ts (новый хук)
"use client";
import { useTonAddress } from "@tonconnect/ui-react";

export function useUserRole() {
  const address = useTonAddress() || "";
  const admins = (process.env.NEXT_PUBLIC_ADMIN_WALLETS || "").split(",");
  return {
    address,
    isAdmin: admins.includes(address),
    isLoggedIn: address !== "",
  };
}
