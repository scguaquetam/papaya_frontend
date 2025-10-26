'use client'

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export default function ConnectWalletButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <Button
        size="lg"
        variant="outline"
        className="w-full border-primary text-primary hover:bg-primary/5 bg-transparent font-medium"
        onClick={() => open()}
      >
        <Wallet className="w-5 h-5 mr-2" />
        {shortenAddress(address)}
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full border-primary text-primary hover:bg-primary/5 bg-transparent font-medium"
      onClick={() => open()}
    >
      <Wallet className="w-5 h-5 mr-2" />
      Login with Social or Wallet
    </Button>
  )
}

