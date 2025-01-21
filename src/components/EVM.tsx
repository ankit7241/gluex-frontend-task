import { useState } from "react";
import { ethers } from "ethers";
import TxList from "./TxList";

interface PaymentParams {
	setTxs: React.Dispatch<React.SetStateAction<any[]>>;
	ether: string;
	addr: string;
}

const startPayment = async ({
	setTxs,
	ether,
	addr,
}: PaymentParams): Promise<void> => {
	try {
		// Check if MetaMask is available
		if (!window.ethereum || !window.ethereum.isMetaMask) {
			throw new Error("MetaMask Not found. Please install MetaMask.");
		}

		await window.ethereum.request({ method: "eth_requestAccounts" });
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		ethers.utils.getAddress(addr); // Validate address
		const tx = await signer.sendTransaction({
			to: addr,
			value: ethers.utils.parseEther(ether),
		});
		console.log({ ether, addr });
		console.log("tx", tx);
		setTxs([tx]);
	} catch (err: any) {
		alert(err.message);
	}
};

export default function WalletConnect() {
	const [txs, setTxs] = useState<any[]>([]);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);

	const connectWallet = async () => {
		try {
			if (!window.ethereum || !window.ethereum.isMetaMask) {
				throw new Error("MetaMask Not found. Please install MetaMask.");
			}

			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setWalletAddress(accounts[0]);
		} catch (error: any) {
			alert(error.message);
		}
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await startPayment({
			setTxs,
			ether: formData.get("ether") as string,
			addr: formData.get("addr") as string,
		});
	};

	return (
		<div>
			<button
				onClick={connectWallet}
				className="btn btn-secondary mb-4 focus:ring focus:outline-none"
			>
				{walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
			</button>

			<form className="m-4" onSubmit={handleSubmit}>
				<div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
					<main className="mt-4 p-4">
						<h1 className="text-xl font-semibold text-gray-700 text-center">
							Send ETH payment
						</h1>
						<div className="">
							<div className="my-3">
								<input
									type="text"
									name="addr"
									className="input input-bordered block w-full focus:ring focus:outline-none"
									placeholder="Recipient Address"
								/>
							</div>
							<div className="my-3">
								<input
									name="ether"
									type="text"
									className="input input-bordered block w-full focus:ring focus:outline-none"
									placeholder="Amount in ETH"
								/>
							</div>
						</div>
					</main>
					<footer className="p-4">
						<button
							type="submit"
							className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
							disabled={!walletAddress} // Disable Pay button if wallet is not connected
						>
							Pay now
						</button>
						<TxList txs={txs} />
					</footer>
				</div>
			</form>
		</div>
	);
}
