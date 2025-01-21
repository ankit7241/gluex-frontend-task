import { ethers } from 'ethers';
import { Connection, PublicKey, SystemProgram, Transaction, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const sendEVMTransaction = async (recipient: string, amount: string) => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount)
    });
    console.log(tx)
    
    // Wait for one confirmation
    await tx.wait(1);
    return tx;
};

export const sendAptosTransaction = async (recipient: string, amount: string) => {
    const wallet = (window as any).aptos;
    if (!wallet) throw new Error("Petra wallet not found");

    const formattedAmount = Math.round(parseFloat(amount) * 100000000);
    
    const transaction = {
        arguments: [recipient, formattedAmount.toString()],
        function: "0x1::coin::transfer",
        type: "entry_function_payload",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
    };

    const pendingTransaction = await wallet.signAndSubmitTransaction(transaction);
    return pendingTransaction;
};

export const sendSolanaTransaction = async (recipient: string, amount: string) => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const { solana } = window as any;
    
    if (!solana?.isPhantom) throw new Error("Phantom wallet not found");

    const fromPubkey = new PublicKey(solana.publicKey);
    const toPubkey = new PublicKey(recipient);
    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports,
        })
    );

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubkey;

    const signed = await solana.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    
    // Fix: Use latest confirmation method
    await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
    });
    return signature;
}; 