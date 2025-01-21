import React, { useState, useEffect, useCallback } from "react";
import {
	Connection,
	PublicKey,
	SystemProgram,
	Transaction,
	clusterApiUrl,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const SolanaApp: React.FC = () => {
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [recipient, setRecipient] = useState<string>("");
	const [amount, setAmount] = useState<number>(0.1); // Default amount in SOL
	const [connected, setConnected] = useState<boolean>(false);

	const connection = new Connection(clusterApiUrl("devnet"));

	// Check if Phantom Wallet is installed
	const isPhantomInstalled = (): boolean => {
		return typeof window !== "undefined" && !!(window as any).solana?.isPhantom;
	};

	// Connect to Phantom Wallet
	const connectWallet = async () => {
		if (!isPhantomInstalled()) {
			alert("Phantom Wallet not found. Please install it.");
			return;
		}

		try {
			const { solana } = window as any;
			const response = await solana.connect();
			setWalletAddress(response.publicKey.toString());
			setConnected(true);
		} catch (error) {
			console.error("Error connecting to wallet:", error);
			setConnected(false);
		}
	};

	// Send SOL
	const sendSol = useCallback(async () => {
		if (!walletAddress) {
			alert("Please connect your wallet first!");
			return;
		}

		try {
			const fromPubkey = new PublicKey(walletAddress);
			const toPubkey = new PublicKey(recipient);
			const lamports = amount * LAMPORTS_PER_SOL;

			// Fetch the recent blockhash
			const { blockhash, lastValidBlockHeight } =
				await connection.getLatestBlockhash();

			const transaction = new Transaction();
			transaction.recentBlockhash = blockhash; // Set the recent blockhash
			transaction.feePayer = fromPubkey; // Set the fee payer
			transaction.add(
				SystemProgram.transfer({
					fromPubkey,
					toPubkey,
					lamports,
				})
			);

			console.log(transaction);

			// Request the user to sign and send the transaction
			const { solana } = window as any;
			const signedTransaction = await solana.signTransaction(transaction);
			const signature = await connection.sendRawTransaction(
				signedTransaction.serialize()
			);
			console.log(signedTransaction);

			// Confirm transaction
			const { value: confirmation } = await connection.confirmTransaction(
				{
					signature,
					blockhash,
					lastValidBlockHeight,
				},
				"processed"
			);

			alert(`Transaction successful! Signature: ${signature}`);
		} catch (error) {
			console.error("Error sending SOL:", error);
			alert("Transaction failed. Check the console for details.");
		}
	}, [walletAddress, recipient, amount]);

	// Render UI
	return (
		<div className="container mt-5">
			<h1>Solana Phantom Wallet Example</h1>

			{connected ? (
				<div>
					<p>Connected Wallet: {walletAddress}</p>
					<button
						className="btn btn-secondary mb-3"
						onClick={() => setConnected(false)}
					>
						Disconnect Wallet
					</button>
				</div>
			) : (
				<button className="btn btn-primary mb-3" onClick={connectWallet}>
					Connect to Phantom Wallet
				</button>
			)}

			<div className="form-group">
				<label htmlFor="recipient">Recipient Wallet Address</label>
				<input
					id="recipient"
					type="text"
					className="form-control"
					placeholder="Enter recipient wallet address"
					value={recipient}
					onChange={(e) => setRecipient(e.target.value)}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="amount">Amount (SOL)</label>
				<input
					id="amount"
					type="number"
					className="form-control"
					placeholder="Enter amount in SOL"
					value={amount}
					onChange={(e) => setAmount(Number(e.target.value))}
					min={0.01}
					step={0.01}
				/>
			</div>

			<button className="btn btn-success mt-3" onClick={sendSol}>
				Send SOL
			</button>
		</div>
	);
};

export default SolanaApp;
