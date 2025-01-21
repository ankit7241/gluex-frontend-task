import { Transaction, VersionedTransaction } from "@solana/web3.js";

declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean;
            request: <T>(args: { method: string; params?: unknown[] }) => Promise<T>;
        };
        aptos?: {
            connect: () => Promise<{ address: string }>;
            isConnected: () => Promise<boolean>;
            signAndSubmitTransaction: (transaction: AptosTransaction) => Promise<{ hash: string }>;
        };
        solana?: {
            isPhantom?: boolean;
            publicKey: { toString: () => string };
            connect: () => Promise<{ publicKey: { toString: () => string } }>;
            signTransaction: (transaction: Transaction) => Promise<VersionedTransaction>;
        };
    }
}

export interface AptosTransaction {
    arguments: string[];
    function: string;
    type: string;
    type_arguments: string[];
}

export interface TransactionError {
    code?: number;
    message: string;
    stack?: string;
}

export type WalletError = Error | TransactionError; 