'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Copy, CheckCircle, Wallet, Info, QrCodeIcon } from "lucide-react"
import { useAccount } from "wagmi"
import ProtectedRoute from "@/components/ProtectedRoute"
import { PYUSD_ADDRESS } from "@/config"

export default function ReceivePage() {
  const { address } = useAccount()
  const [copied, setCopied] = useState(false)
  const [copiedToken, setCopiedToken] = useState(false)

  const copyToClipboard = (text: string, isToken = false) => {
    navigator.clipboard.writeText(text)
    if (isToken) {
      setCopiedToken(true)
      setTimeout(() => setCopiedToken(false), 2000)
    } else {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <ProtectedRoute requireWallet={true}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Receive PYUSD</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm">How to receive PYUSD</h4>
                <p className="text-sm text-muted-foreground">
                  Share your wallet address with the sender. They can send PYUSD tokens to this address on Sepolia Testnet.
                </p>
              </div>
            </div>
          </div>

          {/* Wallet Address Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Your Wallet Address
              </CardTitle>
              <CardDescription>Share this address to receive PYUSD tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Address Display */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                <div className="relative">
                  <div className="p-4 pr-24 bg-muted rounded-lg font-mono text-sm break-all">
                    {address}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(address || '')}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Network Information */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h4 className="font-semibold text-sm">Important Information</h4>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Network:</span> Ethereum Sepolia Testnet
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Token:</span> PYUSD (PayPal USD)
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Only send PYUSD tokens to this address on Sepolia network
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PYUSD Token Contract Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">PYUSD Token Contract</CardTitle>
              <CardDescription>Contract address on Sepolia Testnet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="relative">
                <div className="p-4 pr-24 bg-muted rounded-lg font-mono text-sm break-all">
                  {PYUSD_ADDRESS}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(PYUSD_ADDRESS, true)}
                >
                  {copiedToken ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Share this contract address if the sender needs to add PYUSD to their wallet
              </p>

              <a
                href={`https://sepolia.etherscan.io/token/${PYUSD_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                View on Sepolia Etherscan
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </CardContent>
          </Card>

          {/* Back Button */}
          <Link href="/dashboard" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Back to Dashboard
            </Button>
          </Link>
        </main>
      </div>
    </ProtectedRoute>
  )
}

