import type React from "react";
import Markdown from "react-markdown";
import type { TChatMessage } from "../ChatTypes";

interface ChatMessageProps {
	message: TChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	const isUser = message.role === "user";

	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
			<div
				className={`max-w-[80%] rounded-lg px-4 py-2 ${
					message.isError
						? "bg-red-100 text-red-900 border border-red-300"
						: isUser
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-900"
				}`}
			>
				<div className="text-sm whitespace-pre-wrap break-words">
					<Markdown>{message.content}</Markdown>
				</div>
				{message.functionCalls && message.functionCalls.length > 0 && (
					<div className="mt-2 pt-2 border-t border-gray-300/30 text-xs opacity-75">
						<div className="font-semibold mb-1">Function Calls:</div>
						{message.functionCalls.map((call) => (
							<div key={`${call.name}-${Math.random()}`} className="ml-2">
								• {call.name}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatMessage;
