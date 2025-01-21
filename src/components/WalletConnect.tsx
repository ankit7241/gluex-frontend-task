"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WalletIcon, XIcon } from "lucide-react";

const wallets = [
	{ name: "MetaMask", ecosystem: "EVM" },
	{ name: "Trust Wallet", ecosystem: "EVM" },
	{ name: "Keplr", ecosystem: "Cosmos" },
	{ name: "Phantom", ecosystem: "Solana" },
	{ name: "Pontem", ecosystem: "Aptos" },
];

export default function WalletConnect() {
	const [isOpen, setIsOpen] = useState(false);
	const [connectedWallets, setConnectedWallets] = useState<string[]>([]);

	const toggleWallet = (walletName: string) => {
		setConnectedWallets((prev) =>
			prev.includes(walletName)
				? prev.filter((w) => w !== walletName)
				: [...prev, walletName]
		);
	};

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition duration-300 flex items-center"
			>
				<WalletIcon className="mr-2" />
				{connectedWallets.length > 0
					? `${connectedWallets.length} Connected`
					: "Connect Wallet"}
			</button>

			<AnimatePresence>
				{isOpen && (
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
								{wallets.map((wallet) => (
									<button
										key={wallet.name}
										onClick={() => toggleWallet(wallet.name)}
										className={`w-full p-2 rounded-md flex items-center justify-between transition duration-300 ${
											connectedWallets.includes(wallet.name)
												? "bg-purple-600 text-white"
												: "bg-gray-700 text-gray-300 hover:bg-gray-600"
										}`}
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
