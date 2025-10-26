"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletButton } from "@/components/WalletButton"
import { Check } from "lucide-react"
import ConnectWalletButton from "@/components/ConnectWalletButton"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function LandingPage() {
  return (
    <ProtectedRoute requireWallet={false}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
              <svg className="w-12 h-12 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-balance">Welcome to Papaya</h1>
          <p className="text-base text-muted-foreground leading-relaxed text-pretty">
            Send money to any PayPal account worldwide, instantly. No PayPal account needed.
          </p>
        </div>

        <div className="space-y-3">
          {[
            "Pay with Apple Pay or Crypto",
            "Send to PayPal in seconds",
            "Lower fees than traditional transfers",
            "Earn rewards on every transaction",
            "QR code payments",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <Check className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4">
          <ConnectWalletButton />
        </div>

        <p className="text-xs text-center text-muted-foreground">Powered by PYUSD • Secured by blockchain</p>
      </div>
    </div>
    </ProtectedRoute>
  )
}
