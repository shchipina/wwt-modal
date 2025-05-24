type Props = {
	onClose: () => void
}

const CloseButton: React.FC<Props> = ({ onClose }) => {
	return (
		<button
			onClick={onClose}
			className="absolute text-red-500 text-lg font-bold right-0 top-[20px] cursor-pointer"
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 40 40"
			>
				<path
					d="M 10,10 L 30,30 M 30,10 L 10,30"
					stroke="black"
					strokeWidth="4"
				/>
			</svg>
		</button>
	)
}

export default CloseButton
