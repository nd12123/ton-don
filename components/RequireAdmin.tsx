// components/RequireAdmin.tsx
"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/lib/hooks/useUser"

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoggedIn, isLoading } = useUserRole()
  const router = useRouter()
  const hasRedirected = useRef(false)

  const ready = !isLoading && isAdmin !== null && isLoggedIn !== null
  const isUnauthorized = ready && (!isLoggedIn || !isAdmin)

  useEffect(() => {
    if (isUnauthorized && !hasRedirected.current) {
      hasRedirected.current = true
      router.replace("/")
    }
  }, [isUnauthorized, router])

  if (!ready) return <div className="text-white text-center py-20">Loading...</div>
  if (isUnauthorized) return null

  return <>{children}</>
}
