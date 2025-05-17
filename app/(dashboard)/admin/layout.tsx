"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/lib/hooks/useUser"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoggedIn, isLoading } = useUserRole()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (!isLoggedIn) {
      router.replace("/")
    } else if (!isAdmin) {
      router.replace("/dashboard")
    }
  }, [isAdmin, isLoggedIn, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading admin area...
      </div>
    )
  }

  if (!isLoggedIn || !isAdmin) return null

  return <>{children}</>
}