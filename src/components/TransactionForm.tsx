"use client";

import { useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import {
	sendEVMTransaction,
	sendAptosTransaction,
	sendSolanaTransaction,
} from "@/services/transactions";
import Toast from "./ui/Toast";
import { WalletIcon } from "lucide-react";

interface TransactionFormProps {
	selectedWallet: string | null;
}

const WALLET_TO_ECOSYSTEM = {
	MetaMask: "EVM",
	Phantom: "Solana",
	Petra: "Aptos",
} as const;

interface ToastMessage {
	message: string;
	type: "success" | "error";
}

export default function TransactionForm({
	selectedWallet,
}: TransactionFormProps) {
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [toast, setToast] = useState<ToastMessage | null>(null);

	const ecosystem = selectedWallet
		? WALLET_TO_ECOSYSTEM[selectedWallet as keyof typeof WALLET_TO_ECOSYSTEM]
		: null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!ecosystem || !recipient || !amount) return;

		setIsLoading(true);
		try {
			switch (ecosystem) {
				case "EVM":
					await sendEVMTransaction(recipient, amount);
					break;
				case "Solana":
					await sendSolanaTransaction(recipient, amount);
					break;
				case "Aptos":
					await sendAptosTransaction(recipient, amount);
					break;
			}

			setToast({
				message: "Transaction successful!",
				type: "success",
			});
			setRecipient("");
			setAmount("");
		} catch (error: any) {
			setToast({
				message: `Transaction failed: ${error.message}`,
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const getPlaceholder = () => {
		switch (ecosystem) {
			case "EVM":
				return "0x...";
			case "Solana":
				return "Public key...";
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
			case "Solana":
				return "SOL";
			case "Aptos":
				return "APT";
			default:
				return "";
		}
	};

	return (
		<>
			<div className="max-w-md mx-auto">
				{!selectedWallet ? (
					<div className="backdrop-blur-md bg-gray-800 bg-opacity-50 rounded-lg p-8 text-center">
						<WalletIcon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
						<h3 className="text-xl font-semibold mb-2 text-white">
							Connect Your Wallet
						</h3>
						<p className="text-gray-200">
							Please connect your wallet using the button in the top right to
							make a transaction.
						</p>
					</div>
				) : (
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
								<label
									htmlFor="amount"
									className="block text-sm font-medium mb-2"
								>
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
								disabled={isLoading}
								className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition duration-300 flex items-center justify-center disabled:opacity-50"
							>
								{isLoading ? "Processing..." : "Send Transaction"}
								{!isLoading && <ArrowRightIcon className="ml-2 w-4 h-4" />}
							</button>
						</form>
					</div>
				)}
			</div>
			{toast && <Toast {...toast} onClose={() => setToast(null)} />}
		</>
	);
}
