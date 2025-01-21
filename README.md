# GlueX Frontend Task - Multi-Chain Wallet Integration

This web application demonstrates seamless integration with multiple blockchain wallets, allowing users to connect and send transactions across different ecosystems.

## Features

- 🔗 Multi-chain wallet support
- 💫 Smooth animations and transitions
- 🎨 Modern, responsive UI
- 🔒 Secure transaction handling
- 🚀 Real-time transaction feedback

## Supported Wallets & Networks

- **Ethereum (EVM)**

  - MetaMask
  - Action: Token transfer

- **Solana**

  - Phantom Wallet
  - Action: Token transfer

- **Aptos**
  - Petra Wallet
  - Action: Token transfer

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.0.0 or higher)
- npm or yarn
- MetaMask browser extension
- Phantom Wallet browser extension
- Petra Wallet browser extension

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ankit7241/gluex-frontend-task
cd gluex-frontend-task
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Connect Wallet**

   - Click the "Connect Wallet" button in the top right
   - Select your preferred wallet from the available options
   - Approve the connection request in your wallet

2. **Send Transaction**
   - Once connected, the transaction form will appear
   - Enter the recipient's address
   - Specify the amount to send
   - Click "Send Transaction"
   - Confirm the transaction in your wallet
   - Wait for confirmation and toast notification

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Feature components
├── hooks/             # Custom React hooks
└── services/          # Blockchain interaction services
```

## Technical Details

### Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [ethers.js](https://docs.ethers.org/) - Ethereum interactions

## Deployment Link

[https://gluex-frontend-task.vercel.app](https://gluex-frontend-task.vercel.app)
