import ChatIcon from "@/Shared/Components/Icons/ChatIcon";
import CloseIcon from "@/Shared/Components/Icons/CloseIcon";
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
						<div className="size-8 p-2 rounded-full bg-blue-600  text-white  flex items-center justify-center">
							<ChatIcon />
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
						<CloseIcon />
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
