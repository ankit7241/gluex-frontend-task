"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface ToastProps {
	message: string;
	type: "success" | "error";
	onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
			setTimeout(onClose, 200);
		}, 5000);

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50 }}
					className={`fixed top-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
						type === "success" ? "bg-green-600" : "bg-red-600"
					}`}
				>
					<p className="text-white font-medium">{message}</p>
					<button
						onClick={() => setIsVisible(false)}
						className="text-white hover:text-gray-200 transition-colors"
					>
						<XIcon className="w-4 h-4" />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
