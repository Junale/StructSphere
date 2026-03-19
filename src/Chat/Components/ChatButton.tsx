import ChatIcon from "@/Shared/Components/Icons/ChatIcon";
import { useChat } from "../ChatContext";

const ChatButton = () => {
	const { isOpen, setIsOpen, sessions, createSession } = useChat();

	const handleClick = () => {
		if (!isOpen && Object.keys(sessions).length === 0) {
			createSession();
		}
		setIsOpen(!isOpen);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="fixed bottom-6 right-6 w-14 h-14 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
			aria-label="Open chat"
		>
			<ChatIcon />
		</button>
	);
};

export default ChatButton;
