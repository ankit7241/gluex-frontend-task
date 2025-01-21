// src/types.d.ts
interface Window {
    ethereum?: any; // MetaMask or other Ethereum provider
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      signTransaction: (transaction: any) => Promise<any>;
      publicKey: any;
    };
    keplr?: any; // Keplr wallet
    aptos?: {
      connect: () => Promise<{ address: string }>;
      signAndSubmitTransaction: (payload: any) => Promise<{ hash: string }>;
    };
  }
  