import { useEffect, useRef } from "react";
import { useChat } from "../ChatContext";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatWindow = () => {
	const { sessions, activeSessionId, isLoading, clearHistory } = useChat();
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const activeSession = activeSessionId ? sessions[activeSessionId] : null;

	// biome-ignore lint/correctness/useExhaustiveDependencies: We only want to scroll when messages change
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [activeSession?.messages.length]);

	if (!activeSession) {
		return (
			<div className="flex-1 flex items-center justify-center text-gray-500">
				<div className="text-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="mx-auto mb-4 text-gray-400"
					>
						<title>Chat</title>
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
					</svg>
					<p>Select or create a chat to get started</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col">
			{/* Header */}
			<div className="p-4 border-b border-gray-300 flex justify-between items-center">
				<div>
					<h3 className="font-semibold">{activeSession.title}</h3>
					<p className="text-xs text-gray-500">
						{activeSession.messages.length} messages
					</p>
				</div>
				<button
					type="button"
					onClick={() => {
						if (
							window.confirm(
								"Are you sure you want to clear this chat history?",
							)
						) {
							clearHistory(activeSession.id);
						}
					}}
					className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
				>
					Clear History
				</button>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4">
				{activeSession.messages.length === 0 ? (
					<div className="h-full flex items-center justify-center text-gray-500">
						<div className="text-center max-w-md">
							<h4 className="font-semibold mb-2">
								Welcome to StructSphere AI Assistant!
							</h4>
							<p className="text-sm mb-4">
								I can help you explore your system data. Try asking:
							</p>
							<ul className="text-sm text-left space-y-1">
								<li>• "What entities do I have?"</li>
								<li>• "Show me all my diagrams"</li>
								<li>• "What's in the [diagram name] diagram?"</li>
								<li>• "Give me an overview of my system"</li>
							</ul>
						</div>
					</div>
				) : (
					<>
						{activeSession.messages.map((message) => (
							<ChatMessage key={message.id} message={message} />
						))}
						{isLoading && (
							<div className="flex justify-start mb-4">
								<div className="bg-gray-200 text-gray-900 rounded-lg px-4 py-2">
									<div className="flex gap-1">
										<span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
										<span
											className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
											style={{ animationDelay: "0.1s" }}
										/>
										<span
											className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
											style={{ animationDelay: "0.2s" }}
										/>
									</div>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</>
				)}
			</div>

			{/* Input */}
			<ChatInput />
		</div>
	);
};

export default ChatWindow;
