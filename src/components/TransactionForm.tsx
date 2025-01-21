"use client";

import { useState, useEffect } from "react";
import { ArrowRightIcon } from "lucide-react";

interface TransactionFormProps {
	selectedWallet: string | null;
}

export default function TransactionForm({
	selectedWallet,
}: TransactionFormProps) {
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState("");
	const [ecosystem, setEcosystem] = useState("");

	useEffect(() => {
		if (selectedWallet) {
			const walletEcosystem = {
				MetaMask: "EVM",
				"Trust Wallet": "EVM",
				Keplr: "Cosmos",
				Phantom: "Solana",
				Pontem: "Aptos",
			}[selectedWallet];
			setEcosystem(walletEcosystem || "");
		}
	}, [selectedWallet]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would implement the actual transaction logic
		console.log(`Sending ${amount} to ${recipient} on ${ecosystem} ecosystem`);
	};

	const getPlaceholder = () => {
		switch (ecosystem) {
			case "EVM":
				return "0x...";
			case "Cosmos":
				return "cosmos...";
			case "Solana":
				return "...";
			case "Aptos":
				return "0x...";
			default:
				return "Enter recipient address";
		}
	};

	const getCurrency = () => {
		switch (ecosystem) {
			case "EVM":
				return "ETH";
			case "Cosmos":
				return "ATOM";
			case "Solana":
				return "SOL";
			case "Aptos":
				return "APT";
			default:
				return "";
		}
	};

	if (!selectedWallet) {
		return (
			<div className="text-center text-gray-400">
				Please select a wallet to send a transaction.
			</div>
		);
	}

	return (
		<div className="max-w-md mx-auto">
			<div className="backdrop-blur-md bg-white bg-opacity-10 rounded-lg p-6">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="recipient"
							className="block text-sm font-medium mb-2"
						>
							Recipient Address
						</label>
						<input
							type="text"
							id="recipient"
							value={recipient}
							onChange={(e) => setRecipient(e.target.value)}
							className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
							placeholder={getPlaceholder()}
							required
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="amount" className="block text-sm font-medium mb-2">
							Amount
						</label>
						<div className="relative">
							<input
								type="number"
								id="amount"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
								placeholder="0.00"
								step="0.000001"
								min="0"
								required
							/>
							<span className="absolute right-3 top-2 text-gray-400">
								{getCurrency()}
							</span>
						</div>
					</div>
					<button
						type="submit"
						className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition duration-300 flex items-center justify-center"
					>
						Send Transaction
						<ArrowRightIcon className="ml-2 w-4 h-4" />
					</button>
				</form>
			</div>
		</div>
	);
}
