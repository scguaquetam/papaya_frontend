# PyLink - Send money to PayPal with Crypto 💸

PyLink is a Next.js application that allows users to send money to any PayPal account worldwide using cryptocurrency or Apple Pay. Built for EthOnline 2025 Hackathon.

## ✨ Features

- 🔐 **Crypto Wallet Integration** - Connect with MetaMask, WalletConnect, and other Web3 wallets using Reown AppKit
- 🍎 **Apple Pay Support** - Quick payments with Apple Pay
- 💰 **Multi-Network Support** - Support for Ethereum Mainnet, Arbitrum, Base, and Polygon
- 📱 **QR Code Payments** - Generate and scan QR codes for easy payments
- 🔄 **Real-time Balance Tracking** - Monitor your PYUSD and USD balances
- 📊 **Transaction History** - View your recent payment history
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS and shadcn/ui

## 🚀 Getting Started

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

## 🔧 Configuration

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
- Base
- Polygon

You can modify the supported networks in `config/index.tsx`.

## 📁 Project Structure

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

## 🛠️ Technologies Used

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

## 📱 Usage Examples

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

## 🔒 Security Notes

- Never commit your `.env.local` file
- Always verify transaction details before confirming
- Use secure networks when making transactions
- Keep your wallet's seed phrase safe and never share it

## 🐛 Troubleshooting

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

## 📚 Learn More

- [Reown AppKit Documentation](https://docs.reown.com/appkit/next/core/installation)
- [Wagmi Documentation](https://wagmi.sh)
- [Next.js Documentation](https://nextjs.org/docs)
- [Viem Documentation](https://viem.sh)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is built for EthOnline 2025 Hackathon.

## 🙏 Acknowledgments

- Built with [Reown AppKit](https://reown.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by PYUSD on the blockchain
