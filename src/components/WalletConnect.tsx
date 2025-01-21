"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WalletIcon, XIcon, LogOutIcon } from "lucide-react";
import { useWallets } from "@/hooks/useWallets";

const WALLET_CONFIGS = [
	{ name: "MetaMask", ecosystem: "EVM", connectFn: "connectEVMWallet" },
	{ name: "Phantom", ecosystem: "Solana", connectFn: "connectSolanaWallet" },
	{ name: "Petra", ecosystem: "Aptos", connectFn: "connectAptosWallet" },
] as const;

interface WalletConnectProps {
	onSelect: (wallet: string | null) => void;
}

export default function WalletConnect({ onSelect }: WalletConnectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { connectedWallet, walletAddress, disconnectWallet, ...walletActions } =
		useWallets();

	const handleWalletClick = async (wallet: (typeof WALLET_CONFIGS)[number]) => {
		try {
			if (connectedWallet === wallet.name) {
				disconnectWallet();
				onSelect(null);
			} else if (!connectedWallet) {
				await walletActions[wallet.connectFn as keyof typeof walletActions]();
				onSelect(wallet.name);
				setIsOpen(false);
			}
		} catch (error: any) {
			alert(error.message);
		}
	};

	const handleDisconnect = () => {
		disconnectWallet();
		onSelect(null);
	};

	return (
		<div className="relative">
			{!connectedWallet ? (
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition duration-300 flex items-center"
				>
					<WalletIcon className="mr-2" />
					Connect Wallet
				</button>
			) : (
				<div className="flex items-center gap-2">
					<div className="bg-purple-600 px-4 py-2 rounded-full">
						{walletAddress?.slice(0, 6)}...
					</div>
					<button
						onClick={handleDisconnect}
						className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition duration-300"
						title="Disconnect Wallet"
					>
						<LogOutIcon className="w-5 h-5" />
					</button>
				</div>
			)}

			<AnimatePresence>
				{isOpen && !connectedWallet && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
					>
						<div className="p-4">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-semibold">Connect Wallet</h3>
								<button
									onClick={() => setIsOpen(false)}
									className="text-gray-400 hover:text-white"
								>
									<XIcon />
								</button>
							</div>
							<div className="space-y-2">
								{WALLET_CONFIGS.map((wallet) => (
									<button
										key={wallet.name}
										onClick={() => handleWalletClick(wallet)}
										className="w-full p-2 rounded-md flex items-center justify-between transition duration-300 bg-gray-700 text-gray-300 hover:bg-gray-600"
									>
										<span>{wallet.name}</span>
										<span className="text-sm opacity-75">
											{wallet.ecosystem}
										</span>
									</button>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
