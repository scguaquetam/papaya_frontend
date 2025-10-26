'use client';

import { useState } from 'react';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PAYMENT_TOKENS, ERC20_ABI } from '@/lib/contracts';
import { Check } from 'lucide-react';

interface TokenSelectorProps {
  selectedToken: string;
  onSelectToken: (tokenAddress: string) => void;
}

export function TokenSelector({ selectedToken, onSelectToken }: TokenSelectorProps) {
  const { address } = useAccount();

  return (
    <div className="space-y-3">
      {PAYMENT_TOKENS.map((token) => (
        <TokenOption
          key={token.address}
          token={token}
          isSelected={selectedToken === token.address}
          onSelect={() => onSelectToken(token.address)}
          userAddress={address}
        />
      ))}
    </div>
  );
}

function TokenOption({
  token,
  isSelected,
  onSelect,
  userAddress,
}: {
  token: (typeof PAYMENT_TOKENS)[number];
  isSelected: boolean;
  onSelect: () => void;
  userAddress?: `0x${string}`;
}) {
  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address: userAddress,
    query: {
      enabled: token.symbol === 'ETH' && !!userAddress,
    },
  });

  // Get ERC20 balance
  const { data: tokenBalance } = useReadContract({
    address: token.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: token.symbol !== 'ETH' && !!userAddress,
    },
  });

  const balance =
    token.symbol === 'ETH'
      ? ethBalance
        ? formatUnits(ethBalance.value, ethBalance.decimals)
        : '0'
      : tokenBalance
        ? formatUnits(tokenBalance as bigint, token.decimals)
        : '0';

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
          {token.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{token.symbol}</h3>
          <p className="text-sm text-muted-foreground">{token.name}</p>
          {userAddress && (
            <p className="text-xs text-muted-foreground mt-1">
              Balance: {parseFloat(balance).toFixed(6)} {token.symbol}
            </p>
          )}
        </div>
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>
    </button>
  );
}