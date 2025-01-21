// "use client";

// import Petra from "@/components/Aptos";
// import SolanaApp from "@/components/Solana";
// import WalletConnect from "@/components/WalletConnect";
// import { useState } from "react";

// export default function Home() {
// 	const [address, setAddress] = useState<string | null>(null);

// 	return (
// 		<main className="flex flex-col items-center justify-center h-screen">
// 			<h1 className="text-2xl font-bold mb-4">GlueX Wallet Connector</h1>
// 			<div className="space-y-2">

// 			</div>
// 			{address && <p className="mt-4">Connected Address: {address}</p>}

// 			<WalletConnect />
// 			<SolanaApp />
// 			<Petra />
// 		</main>
// 	);
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon, WalletIcon } from "lucide-react";
import WalletConnect from "../components/WalletConnect";
import TransactionForm from "../components/TransactionForm";

export default function Home() {
	const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

	const wallets = [
		{ name: "MetaMask", ecosystem: "EVM" },
		{ name: "Trust Wallet", ecosystem: "EVM" },
		{ name: "Keplr", ecosystem: "Cosmos" },
		{ name: "Phantom", ecosystem: "Solana" },
		{ name: "Pontem", ecosystem: "Aptos" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
			<header className="container mx-auto px-4 py-6">
				<nav className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">GlueX</h1>
					<WalletConnect />
				</nav>
			</header>

			<main className="container mx-auto px-4 py-12">
				<section className="text-center mb-20">
					<motion.h2
						className="text-5xl font-bold mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						Welcome to GlueX
					</motion.h2>
					<motion.p
						className="text-xl mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Connecting blockchains, intents, and liquidity providers
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<a
							href="#wallets"
							className="inline-flex items-center text-purple-300 hover:text-purple-100 transition duration-300"
						>
							Get Started
							<ChevronDownIcon className="ml-2" />
						</a>
					</motion.div>
				</section>

				<section id="wallets" className="mb-20">
					<h3 className="text-3xl font-bold mb-8 text-center">
						Connect Your Wallet
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{wallets.map((wallet, index) => (
							<motion.div
								key={wallet.name}
								className={`p-6 rounded-lg backdrop-blur-md bg-white bg-opacity-10 cursor-pointer transition duration-300 ${
									selectedWallet === wallet.name
										? "ring-2 ring-purple-500"
										: "hover:bg-opacity-20"
								}`}
								onClick={() => setSelectedWallet(wallet.name)}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<WalletIcon className="w-12 h-12 mb-4 mx-auto" />
								<h4 className="text-xl font-semibold mb-2">{wallet.name}</h4>
								<p className="text-purple-300">{wallet.ecosystem} Ecosystem</p>
							</motion.div>
						))}
					</div>
				</section>

				<section className="mb-20">
					<h3 className="text-3xl font-bold mb-8 text-center">
						Send Transaction
					</h3>
					<TransactionForm selectedWallet={selectedWallet} />
				</section>
			</main>

			<footer className="bg-gray-900 bg-opacity-50 py-8">
				<div className="container mx-auto px-4 text-center">
					<p className="mb-4">&copy; 2025 GlueX. All rights reserved.</p>
					<div className="flex justify-center space-x-4">
						<a
							href="#"
							className="text-purple-300 hover:text-purple-100 transition duration-300"
						>
							Terms of Service
						</a>
						<a
							href="#"
							className="text-purple-300 hover:text-purple-100 transition duration-300"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="text-purple-300 hover:text-purple-100 transition duration-300"
						>
							Contact Us
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
