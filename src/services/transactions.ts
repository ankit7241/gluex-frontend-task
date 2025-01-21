import { ethers } from 'ethers';
import { 
    Connection, 
    PublicKey, 
    SystemProgram, 
    Transaction, 
    clusterApiUrl, 
    LAMPORTS_PER_SOL,
    TransactionSignature,
    VersionedTransaction
} from "@solana/web3.js";
import { AptosTransaction } from '@/types/global';

type Web3Provider = ethers.providers.Web3Provider;
type JsonRpcSigner = ethers.providers.JsonRpcSigner;

interface EVMTransactionResponse extends ethers.providers.TransactionResponse {
    hash: string;
    wait: (confirmations?: number) => Promise<ethers.providers.TransactionReceipt>;
}

interface AptosTransactionResponse {
    hash: string;
    success?: boolean;
}

export const sendEVMTransaction = async (recipient: string, amount: string): Promise<EVMTransactionResponse> => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    
    const provider: Web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer: JsonRpcSigner = provider.getSigner();
    const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount)
    }) as EVMTransactionResponse;
    
    await tx.wait(1);
    return tx;
};

export const sendAptosTransaction = async (recipient: string, amount: string): Promise<{ hash: string }> => {
    if (!window.aptos) throw new Error("Petra wallet not found");
    const wallet = window.aptos;

    const formattedAmount = Math.round(parseFloat(amount) * 100000000);
    
    const transaction: AptosTransaction = {
        arguments: [recipient, formattedAmount.toString()],
        function: "0x1::coin::transfer",
        type: "entry_function_payload",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
    };

    const pendingTransaction = await wallet.signAndSubmitTransaction(transaction);
    return pendingTransaction;
};

export const sendSolanaTransaction = async (recipient: string, amount: string): Promise<TransactionSignature> => {
    const connection = new Connection(clusterApiUrl("devnet"));
    if (!window.solana?.isPhantom) throw new Error("Phantom wallet not found");
    const { solana } = window;
    
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

    const signed = await solana.signTransaction(transaction) as VersionedTransaction;
    const signature = await connection.sendRawTransaction(signed.serialize());
    
    await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight
    });
    return signature;
}; 