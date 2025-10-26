// Contract addresses on Ethereum Mainnet
export const CONTRACTS = {
  CLIENT: '0xd3335a63df9a3133fc313b1306fdd48612d7fd98',
  PAYMENT_GATEWAY: '0x5c9475e14b7a4857e460702764c4d5186ffd697d',
  CHAIN_PRICE_ORACLE: '0x6fc13169c426a1f4027a5c1388ff17ae183bbbca',
  UNISWAP_V3_ORACLE: '0x8fff822893486c999831514b194773e02a08695b',
} as const;

// Token addresses on Ethereum Mainnet
export const TOKENS = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  PYUSD: '0x6c3ea9036406852006290770BEdFcAbA0e23A0e8',
} as const;

// Client contract ABI (minimal interface for payment)
export const CLIENT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'paymentToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'payee', type: 'address' },
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'paymentToken', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'estimatePayment',
    outputs: [
      { internalType: 'uint256', name: 'estimatedAmount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// ERC20 ABI for token operations
export const ERC20_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Supported payment tokens
export const PAYMENT_TOKENS = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000', // Native ETH
    decimals: 18,
    icon: '⟠',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: TOKENS.DAI,
    decimals: 18,
    icon: '◈',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: TOKENS.USDT,
    decimals: 6,
    icon: '₮',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: TOKENS.USDC,
    decimals: 6,
    icon: '$',
  },
  {
    symbol: 'PYUSD',
    name: 'PayPal USD',
    address: TOKENS.PYUSD,
    decimals: 6,
    icon: '💲',
  },
] as const;