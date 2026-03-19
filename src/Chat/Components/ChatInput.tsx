import { useState } from "react";
import LoadingSpinnerIcon from "@/Shared/Components/Icons/LoadingSpinnerIcon";
import SendIcon from "@/Shared/Components/Icons/SendIcon";
import { useChat } from "../ChatContext";

const ChatInput = () => {
	const { sendMessage, isLoading } = useChat();
	const [input, setInput] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const message = input.trim();
		setInput("");
		await sendMessage(message);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="p-4 border-t border-gray-300">
			<div className="flex gap-2">
				<textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Ask about your system..."
					className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px] max-h-[120px]"
					rows={1}
					disabled={isLoading}
				/>
				<button
					type="submit"
					disabled={!input.trim() || isLoading}
					className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
				>
					<div className="h-6 w-6">
						{isLoading ? <LoadingSpinnerIcon /> : <SendIcon />}
					</div>
				</button>
			</div>
			<div className="text-xs text-gray-500 mt-2">
				Press Enter to send, Shift+Enter for new line
			</div>
		</form>
	);
};

export default ChatInput;
