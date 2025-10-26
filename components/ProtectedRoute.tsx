'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireWallet?: boolean
}

/**
 * Component to protect routes based on wallet connection status
 * @param requireWallet - If true, redirects to "/" if wallet is not connected. If false, redirects to "/dashboard" if wallet is connected.
 */
export default function ProtectedRoute({ children, requireWallet = true }: ProtectedRouteProps) {
  const { isConnected } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (requireWallet && !isConnected) {
      router.push('/')
    }
    
    if (!requireWallet && isConnected) {
      router.push('/dashboard')
    }
  }, [isConnected, requireWallet, router])

  // Show loading state while checking connection
  if (requireWallet && !isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking wallet connection...</p>
        </div>
      </div>
    )
  }

  if (!requireWallet && isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

