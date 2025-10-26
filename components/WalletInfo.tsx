'use client'

import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wallet, Copy, ExternalLink } from 'lucide-react'

export default function WalletInfo() {
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({
    address: address,
  })

  if (!isConnected) {
    return (
      <Card className="border-dashed">
        <CardContent className="pt-6 pb-6 text-center">
          <Wallet className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-3">
            No wallet connected
          </p>
          <appkit-button />
        </CardContent>
      </Card>
    )
  }

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const openExplorer = () => {
    if (address && chain) {
      const explorers: Record<number, string> = {
        1: 'https://etherscan.io/address/',
        137: 'https://polygonscan.com/address/',
        42161: 'https://arbiscan.io/address/',
        8453: 'https://basescan.org/address/',
      }
      const explorerUrl = explorers[chain.id]
      if (explorerUrl) {
        window.open(`${explorerUrl}${address}`, '_blank')
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Connected
        </CardTitle>
        <CardDescription>
          {chain?.name || 'Unknown network'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Address</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm bg-muted px-3 py-2 rounded-md font-mono">
              {address && shortenAddress(address)}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={copyAddress}
              title="Copy address"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={openExplorer}
              title="View in explorer"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {balance && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Balance</p>
            <p className="text-2xl font-bold">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </p>
          </div>
        )}

        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => disconnect()}
          >
            Disconnect Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

