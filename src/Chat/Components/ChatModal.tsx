import { useChat } from "../ChatContext";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const ChatModal = () => {
	const { isOpen, setIsOpen } = useChat();

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<button
				type="button"
				className="fixed inset-0 bg-black/50 z-40 cursor-default"
				onClick={() => setIsOpen(false)}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-lg shadow-2xl z-50 flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-gray-300">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>AI</title>
								<path d="M12 2L2 7l10 5 10-5-10-5z" />
								<path d="M2 17l10 5 10-5" />
								<path d="M2 12l10 5 10-5" />
							</svg>
						</div>
						<div>
							<h2 className="text-lg font-semibold">AI Assistant</h2>
							<p className="text-xs text-gray-500">
								Powered by Gemini with function calling
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						aria-label="Close chat"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<title>Close</title>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>

				{/* Content */}
				<div className="flex-1 flex overflow-hidden">
					<ChatList />
					<ChatWindow />
				</div>
			</div>
		</>
	);
};

export default ChatModal;
