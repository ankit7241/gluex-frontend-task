import React, { useState, useCallback } from "react";
import { AptosClient } from "aptos";

const Petra = () => {
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [transactionHash, setTransactionHash] = useState<string | null>(null);
	const [recipient, setRecipient] = useState<string>("");
	const [amount, setAmount] = useState<string>("");

	// Aptos client
	const client = new AptosClient("https://testnet.aptoslabs.com");

	// Function to get the Aptos wallet
	const getAptosWallet = () => {
		if ("aptos" in window) {
			return (window as any).aptos;
		} else {
			window.open("https://petra.app/", `_blank`);
			return null;
		}
	};

	// Connect to Petra
	const connectWallet = useCallback(async () => {
		const wallet = getAptosWallet();
		if (!wallet) return;

		try {
			const response = await wallet.connect();
			setWalletAddress(response.address);
			setIsConnected(true);
			console.log("Wallet connected:", response);
		} catch (error) {
			console.error("Error connecting to Petra:", error);
			alert("Failed to connect wallet. Please try again.");
		}
	}, []);

	// Disconnect from Petra
	const disconnectWallet = useCallback(async () => {
		const wallet = getAptosWallet();
		if (!wallet) return;

		try {
			await wallet.disconnect();
			setWalletAddress(null);
			setIsConnected(false);
			console.log("Wallet disconnected");
		} catch (error) {
			console.error("Error disconnecting wallet:", error);
		}
	}, []);

	// Send a transaction
	const sendTransaction = useCallback(async () => {
		const wallet = getAptosWallet();
		if (!wallet || !walletAddress) {
			alert("Please connect your wallet first!");
			return;
		}

		if (!recipient || !amount) {
			alert("Please provide both recipient address and amount.");
			return;
		}

		const formattedAmount = Math.round(parseFloat(amount) * 100000000); // Convert to microunits

		const transaction = {
			arguments: [recipient, formattedAmount.toString()],
			function: "0x1::coin::transfer",
			type: "entry_function_payload",
			type_arguments: ["0x1::aptos_coin::AptosCoin"],
		};

		try {
			const pendingTransaction = await wallet.signAndSubmitTransaction(
				transaction
			);
			console.log("Pending transaction:", pendingTransaction);

			// Wait for transaction confirmation
			const txn = await client.waitForTransactionWithResult(
				pendingTransaction.hash
			);
			setTransactionHash(pendingTransaction.hash);
			alert("Transaction successful!");
			console.log("Transaction result:", txn);
		} catch (error) {
			console.error("Error sending transaction:", error);
			alert("Transaction failed. Check console for details.");
		}
	}, [walletAddress, recipient, amount, client]);

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<h1>Petra Wallet Integration</h1>
			{!isConnected ? (
				<button onClick={connectWallet} style={buttonStyle}>
					Connect to Petra
				</button>
			) : (
				<>
					<p>Connected Wallet: {walletAddress}</p>
					<button onClick={disconnectWallet} style={buttonStyle}>
						Disconnect Wallet
					</button>
					<div style={{ margin: "20px 0" }}>
						<input
							type="text"
							placeholder="Recipient Address"
							value={recipient}
							onChange={(e) => setRecipient(e.target.value)}
							style={inputStyle}
						/>
						<input
							type="number"
							placeholder="Amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							style={inputStyle}
						/>
					</div>
					<button onClick={sendTransaction} style={buttonStyle}>
						Send Transaction
					</button>
				</>
			)}
			{transactionHash && (
				<p>
					<strong>Transaction Hash:</strong>{" "}
					<a
						href={`https://explorer.aptoslabs.com/txn/${transactionHash}?network=testnet`}
						target="_blank"
						rel="noopener noreferrer"
					>
						{transactionHash}
					</a>
				</p>
			)}
		</div>
	);
};

const buttonStyle = {
	padding: "10px 20px",
	margin: "10px",
	backgroundColor: "#6200EA",
	color: "#FFF",
	border: "none",
	borderRadius: "5px",
	cursor: "pointer",
};

const inputStyle = {
	padding: "10px",
	margin: "10px 5px",
	width: "300px",
	border: "1px solid #ccc",
	borderRadius: "5px",
};

export default Petra;
