import DeleteIcon from "../../Shared/Components/Icons/DeleteIcon";
import { useChat } from "../ChatContext";

const ChatList = () => {
	const {
		sessions,
		activeSessionId,
		setActiveSession,
		createSession,
		deleteSession,
	} = useChat();

	const sessionList = Object.values(sessions).sort(
		(a, b) => b.updatedAt - a.updatedAt,
	);

	return (
		<div className="w-64 border-r border-gray-300 flex flex-col">
			<div className="p-4 border-b border-gray-300">
				<button
					type="button"
					onClick={createSession}
					className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
				>
					+ New Chat
				</button>
			</div>
			<div className="flex-1 overflow-y-auto">
				{sessionList.length === 0 ? (
					<div className="p-4 text-center text-gray-500 text-sm">
						No chats yet
					</div>
				) : (
					sessionList.map((session) => (
						<div
							key={session.id}
							className={`relative group cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors ${
								session.id === activeSessionId ? "bg-blue-50" : ""
							}`}
						>
							<button
								type="button"
								onClick={() => setActiveSession(session.id)}
								className="w-full text-left p-3 pr-10"
							>
								<div className="font-medium text-sm truncate">
									{session.title}
								</div>
								<div className="text-xs text-gray-500 mt-1">
									{session.messages.length} messages
								</div>
							</button>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									if (
										window.confirm("Are you sure you want to delete this chat?")
									) {
										deleteSession(session.id);
									}
								}}
								className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-opacity"
								aria-label="Delete chat"
							>
								<div className="size-6">
									<DeleteIcon />
								</div>
							</button>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default ChatList;
