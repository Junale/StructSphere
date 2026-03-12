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
			className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
			aria-label="Open chat"
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
				<title>Chat</title>
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			</svg>
		</button>
	);
};

export default ChatButton;
