import { useState } from 'react';

export function useWallets() {
    const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    
    const disconnectWallet = () => {
        console.log('Disconnecting wallet');
        setConnectedWallet(null);
        setWalletAddress(null);
    };

    const connectEVMWallet = async () => {
        try {
            if (!window.ethereum) throw new Error("MetaMask not found");
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setWalletAddress(accounts[0]);
            setConnectedWallet("MetaMask");
            return accounts[0];
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    };

    const connectAptosWallet = async () => {
        const wallet = (window as any).aptos;
        if (!wallet) throw new Error("Petra wallet not found");
        
        try {
            const response = await wallet.connect();
            setWalletAddress(response.address);
            setConnectedWallet("Petra");
            return response.address;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const connectSolanaWallet = async () => {
        if (!(window as any).solana?.isPhantom) {
            throw new Error("Phantom wallet not found");
        }

        try {
            const response = await (window as any).solana.connect();
            const address = response.publicKey.toString();
            setWalletAddress(address);
            setConnectedWallet("Phantom");
            return address;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return {
        connectedWallet,
        walletAddress,
        connectEVMWallet,
        connectAptosWallet,
        connectSolanaWallet,
        disconnectWallet
    };
} 