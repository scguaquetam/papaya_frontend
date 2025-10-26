
<!-- PROJECT INTRO -->

<!-- Notas:
No olvidar subir el link del demo 
 -->
 <a name="readme-top"></a>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

</div>

<br />
<div align="center">
  <a href="https://github.com/scguaquetam/papaya_frontend">
    <img src="https://i.ibb.co/CKQgpSfT/payapa-sdf.png">
  </a>

 <h3 align="center">Send and receive money worldwide. Pay anyone with Apple Pay. Papaya. Instantly.</h3>

  <p align="center">

  [EthGlobal Online 2025](https://ethglobal.com/events/ethonline2025)

   <br />
    <a href="https://github.com/scguaquetam/papaya_frontend"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://papaya-frontend-ten.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/scguaquetam/papaya_frontend">Report Bug</a>
    ·
    <a href="https://github.com/scguaquetam/papaya_frontend">Request Feature</a>
  </p>
</div>

<br />

<!-- Papaya CODEBASE -->

<div align="center">
  <h2> Papaya Codebase</h2>
  
  <a href="https://github.com/scguaquetam/papaya_frontend">
    <img src="https://img.shields.io/badge/Frontend-App%20-FF7A00?style=for-the-badge&logo=github" alt="Frontend Repository">
  </a>
  <a href="https://github.com/JMSBPP/papaya-contracts">
    <img src="https://img.shields.io/badge/Backend-Contracts%20-FF7A00?style=for-the-badge&logo=github" alt="Backend Repository">
  </a>
</div>

<br />

<!-- TABLE OF CONTENTS -->

# Table of Contents 

1. [About de Project](#about-the-project)
2. [Demo](#demo)
3. [How it works](#how-it-works)
4. [Team](#team)
5. [Installation](#installation)

<br />


<!-- ABOUT THE PROJECT -->

# About The Project


<br />


![Papaya](https://i.ibb.co/CKQgpSfT/payapa-sdf.png)

Papaya connects Apple Pay, PayPal, and crypto so anyone can send PYUSD instantly, even if the recipient doesn’t have a PayPal account.

Built on Web3 rails, Papaya makes money move like messages — no banks, no borders, no delays. And every time you send, you earn cashback and rewards.

Papaya allows seamless transfers between:
	•	Apple Pay → PYUSD on-chain → PayPal
	•	Wallet to wallet (crypto ↔ PYUSD)
	•	PayPal accounts ↔ smart wallets

Send and receive money worldwide. Pay anyone with Apple Pay. Papaya. Instantly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# How it Works

Papaya is built with Next.js, TypeScript, and Reown AppKit, using Hardhat, Pyth Network, and PayPal USD (PYUSD) as the foundation of its Web3 payment architecture.


- PaymentGateway.sol: Core payment routing and settlement logic.
- ChainPriceOracle.sol: Price feed aggregation and Pyth Network integration.
- UniswapV3Oracle.sol: Liquidity and secondary price validation layer.

**Pyth Network** Provides real-time on-chain price feeds to validate USD↔crypto↔PYUSD conversions, ensuring fair rates and accurate remittances.

**PayPal USD (PYUSD)** The core settlement token, powering instant and dollar-backed transfers between Apple Pay, PayPal, and Web3 wallets.

It is a dApp created on Next JS, using Apple Pay - Payment Request API, for managing apple pay payments for sending PYUSD to other users.
It uses also Reown SDK for wallet management, and smart wallet infra, with the capability of using social login.

![HowItWorks](https://i.postimg.cc/7Z9NQpzP/Whats-App-Image-2025-10-15-at-14-50-44.jpg) 

 ## Features

- **Crypto Wallet Integration** - Connect with MetaMask, WalletConnect, and other Web3 wallets using Reown AppKit
- **Apple Pay Support** - Quick payments with Apple Pay
- **Multi-Network Support** - Support for Ethereum Mainnet and Arbitrum
- **QR Code Payments** - Generate and scan QR codes for easy payments
- **Real-time Balance Tracking** - Monitor your PYUSD and USD balances
- **Transaction History** - View your recent payment history
- **Modern UI** - Beautiful, responsive design with Tailwind CSS and shadcn/ui

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contracts
## Deployed Contracts (Sepolia)

| Contract | Address | SepoliaScan |
|----------|---------|-------------|
| UniswapV3Oracle | TBD | Check transactions |
| ChainPriceOracle | TBD | Check transactions |
| PaymentGateway | 0x3abCA976AdF6dEa7Dd469e711882aE625DEF89C9 | [View on SepoliaScan](https://sepolia.etherscan.io/address/0x3abCA976AdF6dEa7Dd469e711882aE625DEF89C9) |
| Client | 0xf256E506c9267A7a2B7E0B4a6775c6943B42994F | [View on SepoliaScan](https://sepolia.etherscan.io/address/0xf256E506c9267A7a2B7E0B4a6775c6943B42994F) |

> For crypto payments users can pay with any ERC20 token that has a Uniswap V3 pair with USDC.
- The system leverages Pyth oracles to get real-time USD quotes for the payment tokens, ensuring fair pricing.

- Payment amounts are automatically converted to pyUSD and securely stored in an escrow vault powered by Euler Vault Kit. 
- The intended receiver—a PayPal on-chain API party—can subsequently claim these funds from the escrow vault.


# Demo

<!--[![Demo Video](Video) -->

<!--Add contracts if possible -->


<p align="right">(<a href="#readme-top">back to top</a>)</p> 

# Team

Sebastian Guaqueta ([@scguaquetam](https://twitter.com/scguaquetam)): Sr. Software Engineer at Rootstock , collaborator at [WTF Academy Contributor](https://twitter.com/WTFAcademy_).
<br />

Juan Serrano ([@juanmiguel53475](https://x.com/juanmiguel53475)): Solidity Dev. EVM-based DEX AMM protocol Hooks/Plugins designs and implementations.
<br />

Gitmel Gutierrez ([@whynotgit](https://twitter.com/whynotgit)): Product Designer.
<br />

Angela O ([@ocandocrypto](https://twitter.com/ocandocrypto)): UF Dev Community Manager.
<br />


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- INstallation -->

## Installation 

### Prerequisites

- Node.js 18+ installed
- A Reown Project ID (get one from [Reown Dashboard](https://dashboard.reown.com))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd papaya_frontend_applepay
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Reown AppKit Setup

This project uses Reown AppKit (formerly WalletConnect) for Web3 wallet integration. To set it up:

1. Visit [Reown Dashboard](https://dashboard.reown.com)
2. Create a new project
3. Copy your Project ID
4. Add it to your `.env.local` file

For detailed instructions, see [REOWN_SETUP.md](./REOWN_SETUP.md).

### Supported Networks

The application supports the following networks:
- Ethereum Mainnet
- Arbitrum

You can modify the supported networks in `config/index.tsx`.

## Project Structure

```
papaya_frontend_applepay/
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard pages
│   │   ├── qr/             # QR code payment page
│   │   ├── send/           # Send money page
│   │   └── success/        # Success page
│   ├── layout.tsx          # Root layout with Reown provider
│   └── page.tsx            # Landing page
├── components/              # React components
│   ├── Applepay/           # Apple Pay integration
│   ├── ui/                 # shadcn/ui components
│   └── WalletInfo.tsx      # Wallet connection info
├── config/                  # Configuration files
│   └── index.tsx           # Wagmi & Reown configuration
├── context/                 # React contexts
│   └── index.tsx           # Reown AppKit context provider
├── lib/                     # Utility functions
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Technologies Used

- **Next.js 16** - React framework with Turbopack
- **React 19** - UI library
- **TypeScript** - Type safety
- **Reown AppKit** - Web3 wallet connection
- **Wagmi** - React hooks for Ethereum
- **Viem** - Ethereum library
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Lucide React** - Icons

## Usage Examples

### Connect a Wallet

The landing page includes a button to connect your crypto wallet. Once connected, you can view your wallet information in the dashboard.

### View Wallet Information

The `WalletInfo` component shows:
- Connected wallet address
- Current network
- ETH balance
- Options to copy address or view in block explorer

### Send Payment

Navigate to `/dashboard/send` to send money to a PayPal account using your connected wallet.

## Security Notes

- Never commit your `.env.local` file
- Always verify transaction details before confirming
- Use secure networks when making transactions
- Keep your wallet's seed phrase safe and never share it

## Troubleshooting

### Build Errors

If you encounter build errors, try:
```bash
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Wallet Connection Issues

1. Make sure your `.env.local` file has a valid `NEXT_PUBLIC_PROJECT_ID`
2. Check that your wallet is connected to a supported network
3. Clear your browser cache and try again

## Learn More

- [Reown AppKit Documentation](https://docs.reown.com/appkit/next/core/installation)
- [Wagmi Documentation](https://wagmi.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [Viem Documentation](https://viem.sh)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is built for EthOnline 2025 Hackathon.

## Acknowledgments

- Built with [Reown AppKit](https://reown.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by PYUSD on the blockchain

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS -->

[contributors-shield]: https://img.shields.io/github/contributors/OWL-lang-org/owl-miniapp.svg?style=for-the-badge&color=FF7A00

[contributors-url]: https://github.com/scguaquetam/papaya_frontend/graphs/contributors

[stars-shield]: https://img.shields.io/github/stars/OWL-lang-org/owl-miniapp.svg?style=for-the-badge&color=white

[stars-url]: https://github.com/scguaquetam/papaya_frontend/stargazers

[issues-shield]: https://img.shields.io/github/issues/OWL-lang-org/owl-miniapp.svg?style=for-the-badge&color=FF7A00

[issues-url]: https://github.com/scguaquetam/papaya_frontend/issues
