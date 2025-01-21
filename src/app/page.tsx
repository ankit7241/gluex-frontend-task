// app/page.tsx
"use client";

import Petra from "@/components/Aptos";
import SolanaApp from "@/components/Solana";
import WalletConnect from "@/components/WalletConnect";
import { connectMetaMask } from "@/lib/evm";
// import { connectPhantom, sendTransactionPhantom } from "@/lib/solana";
// import { connectKeplr, sendTransactionKeplr } from "@/lib/cosmos";
// import { connectPetra, sendTransactionPetra } from "@/lib/aptos";
import { useState } from "react";

export default function Home() {
	const [address, setAddress] = useState<string | null>(null);

	const connectWallet = async (wallet: string) => {
		try {
			let addr;
			switch (wallet) {
				case "MetaMask":
					addr = await connectMetaMask();
					break;
				// case "Phantom":
				// 	addr = await connectPhantom();
				// 	break;
				// case "Keplr":
				// 	addr = await connectKeplr();
				// 	break;
				// case "Petra":
				// 	addr = await connectPetra();
				// 	break;
				default:
					throw new Error("Unsupported wallet!");
			}
			setAddress(addr);
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold mb-4">GlueX Wallet Connector</h1>
			<div className="space-y-2">
				<button onClick={() => connectWallet("MetaMask")} className="btn">
					Connect MetaMask
				</button>
				{/* <button onClick={() => connectWallet("Phantom")} className="btn">
					Connect Phantom
				</button>
				<button onClick={() => connectWallet("Keplr")} className="btn">
					Connect Keplr
				</button> */}
				{/* <button onClick={() => connectWallet("Petra")} className="btn">
					Connect Petra
				</button> */}
			</div>
			{address && <p className="mt-4">Connected Address: {address}</p>}

			<WalletConnect />
			<SolanaApp />
			<Petra />
		</main>
	);
}
