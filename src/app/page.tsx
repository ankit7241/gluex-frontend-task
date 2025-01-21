"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WalletConnect from "@/components/WalletConnect";
import TransactionForm from "@/components/TransactionForm";
import { useWallets } from "@/hooks/useWallets";

export default function Home() {
	const { connectedWallet } = useWallets();
	const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

	useEffect(() => {
		setSelectedWallet(connectedWallet);
	}, [connectedWallet]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
			<header className="container mx-auto px-4 py-6">
				<nav className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">GlueX</h1>
					<WalletConnect onSelect={setSelectedWallet} />
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
				</section>

				<section className="mb-20">
					<h3 className="text-3xl font-bold mb-8 text-center">
						Send Transaction
					</h3>
					<TransactionForm selectedWallet={selectedWallet} />
				</section>
			</main>
		</div>
	);
}
