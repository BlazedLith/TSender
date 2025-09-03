# T-Sender

A Web3 ERC20 token airdrop application that allows users to distribute tokens to multiple recipients in a single transaction across multiple blockchain networks.

🚀 **Live Demo**: [https://t-sender-khaki.vercel.app/](https://t-sender-khaki.vercel.app/)

## Features

- **Multi-Chain Support**: Deploy and use across multiple blockchain networks including:
  - Ethereum Mainnet
  - ZKSync Era
  - Arbitrum
  - Optimism
  - Base
  - Sepolia Testnet
  - Local Development (Anvil)

- **Batch Token Distribution**: Send ERC20 tokens to multiple recipients in a single transaction
- **Safe Mode**: Built-in validation to ensure secure token transfers
- **Real-Time Token Information**: Automatically fetches token details (name, decimals, balance)
- **User-Friendly Interface**: Clean, responsive design with transaction progress indicators
- **Local Storage Persistence**: Saves form data between sessions
- **Gas Optimization**: Efficient smart contract design for cost-effective batch transfers

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Web3 Integration**: Wagmi, Viem, RainbowKit
- **State Management**: React Hooks with local storage persistence
- **Testing**: Vitest, Playwright, Synpress
- **Deployment**: Vercel

## Smart Contract Architecture

The application uses deployed smart contracts on multiple chains that handle:
- Batch ERC20 token transfers
- Input validation for recipient addresses and amounts
- Gas-optimized operations using assembly code
- Safe approval and transfer mechanisms

### Supported Networks & Contract Addresses

| Network | Chain ID | Contract Address |
|---------|----------|------------------|
| ZKSync Era | 324 | `0x7e645Ea4386deb2E9e510D805461aA12db83fb5E` |
| Ethereum | 1 | `0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821` |
| Arbitrum | 42161 | `0xA2b5aEDF7EEF6469AB9cBD99DE24a6881702Eb19` |
| Optimism | 10 | `0xAaf523DF9455cC7B6ca5637D01624BC00a5e9fAa` |
| Base | 8453 | `0x31801c3e09708549c1b2c9E1CFbF001399a1B9fa` |
| Sepolia | 11155111 | `0xa27c5C77DA713f410F9b15d4B0c52CAe597a973a` |

## Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM (recommended) or npm/yarn
- Web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/BlazedLith/TSender.git
cd TSender
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development with Anvil

For local testing, you can use the included Anvil state:

```bash
pnpm anvil
```

This loads a pre-configured local blockchain with deployed contracts and test tokens.

## How to Use

1. **Connect Wallet**: Click "Connect Wallet" and select your preferred wallet
2. **Enter Token Address**: Input the ERC20 token contract address you want to distribute
3. **Add Recipients**: Enter recipient addresses (one per line or comma-separated)
4. **Set Amounts**: Enter corresponding amounts for each recipient
5. **Review Transaction**: Check the transaction details including total amount and recipient count
6. **Execute Airdrop**: Click "Send Airdrop" and confirm the transaction in your wallet

## Security Features

- **Input Validation**: Comprehensive validation of addresses and amounts
- **Safe Mode**: Built-in checks to prevent common errors
- **Approval Management**: Automatic handling of ERC20 approvals
- **Gas Estimation**: Prevents failed transactions due to insufficient gas

## Development Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Testing
pnpm test         # Run unit tests with Vitest

# Blockchain
pnpm anvil        # Start local Anvil node with deployed state
```

## Project Structure

```
TSender/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── AirdropForm.tsx  # Main airdrop interface
│   │   ├── HomeContent.tsx  # Home page content
│   │   └── InputField.tsx   # Reusable input component
│   ├── constants/           # Contract addresses and ABIs
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── tsender-deployed.json    # Anvil blockchain state
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---
