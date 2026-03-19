import { useEffect, useRef } from "react";
import ChatIcon from "@/Shared/Components/Icons/ChatIcon";
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
				<div className="flex flex-col text-center items-center ">
					<div className="size-24 flex items-center justify-center">
						<ChatIcon />
					</div>
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
										<span className="size-2 bg-gray-500 rounded-full animate-bounce" />
										<span
											className="size-2 bg-gray-500 rounded-full animate-bounce"
											style={{ animationDelay: "0.1s" }}
										/>
										<span
											className="size-2 bg-gray-500 rounded-full animate-bounce"
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
