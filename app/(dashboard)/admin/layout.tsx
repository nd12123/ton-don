"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/lib/hooks/useUser"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoggedIn, isLoading } = useUserRole()
  const router = useRouter()

  const notReady = isLoading || isAdmin === null || isLoggedIn === null
  const isUnAuthorized = isLoggedIn === false || isAdmin === false 

  const didRedirect = useRef(false)

  console.log(isAdmin, isLoggedIn, isLoading)
  console.log(notReady, isUnAuthorized)

  useEffect(() => {
    if (notReady || didRedirect.current) return
    //if (isLoading) return
    if (isUnAuthorized) {
      didRedirect.current = true
      router.replace("/")
    } // else if (!isAdmin) { router.replace("/dashboard")}
    console.log("well, unAuth")
  }, [notReady, isUnAuthorized, router])//[isAdmin, isLoggedIn, isLoading, router])

  if (notReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading admin area...
      </div>
    )
  }

  if (isUnAuthorized) return null
  console.log("well, well, well")
  return <>{children}</>
}