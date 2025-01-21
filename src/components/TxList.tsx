interface TxListProps {
	txs: { hash: string }[];
}

export default function TxList({ txs }: TxListProps) {
	if (txs.length === 0) return null;

	return (
		<>
			{txs.map((item) => (
				<div key={item.hash} className="alert alert-info mt-5">
					<div className="flex-1">
						<label>{item.hash}</label>
					</div>
				</div>
			))}
		</>
	);
}
