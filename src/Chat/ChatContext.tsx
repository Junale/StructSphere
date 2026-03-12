import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { TChatMessage, TChatSession } from "./ChatTypes";
import { generateChatResponse } from "./geminiService";

type ChatContextType = {
	sessions: Record<string, TChatSession>;
	activeSessionId: string | null;
	isOpen: boolean;
	isLoading: boolean;

	setIsOpen: (isOpen: boolean) => void;
	createSession: () => string;
	deleteSession: (sessionId: string) => void;
	setActiveSession: (sessionId: string | null) => void;
	sendMessage: (content: string) => Promise<void>;
	clearHistory: (sessionId: string) => void;
	setSessions: React.Dispatch<
		React.SetStateAction<Record<string, TChatSession>>
	>;
};

const ChatContext = createContext<ChatContextType | null>(null);

const STORAGE_KEY = "structsphere-chat";

const createNewSession = (): TChatSession => {
	const now = Date.now();
	return {
		id: `session-${now}`,
		title: "New Chat",
		messages: [],
		createdAt: now,
		updatedAt: now,
	};
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [sessions, setSessions] = useState<Record<string, TChatSession>>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	});

	const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
		const sessionIds = Object.keys(sessions);
		return sessionIds.length > 0 ? sessionIds[0] : null;
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
		} catch (error) {
			console.error("Failed to save chat sessions to localStorage:", error);
		}
	}, [sessions]);

	const createSession = (): string => {
		const newSession = createNewSession();
		setSessions((prev) => ({
			...prev,
			[newSession.id]: newSession,
		}));
		setActiveSessionId(newSession.id);
		return newSession.id;
	};

	const deleteSession = (sessionId: string) => {
		setSessions((prev) => {
			const next = { ...prev };
			delete next[sessionId];
			return next;
		});
		if (activeSessionId === sessionId) {
			const remainingIds = Object.keys(sessions).filter(
				(id) => id !== sessionId,
			);
			setActiveSessionId(remainingIds.length > 0 ? remainingIds[0] : null);
		}
	};

	const setActiveSession = (sessionId: string | null) => {
		setActiveSessionId(sessionId);
	};

	const sendMessage = async (content: string) => {
		if (!activeSessionId) {
			const newSessionId = createSession();
			setActiveSessionId(newSessionId);
		}

		const sessionId = activeSessionId || Object.keys(sessions)[0];
		const userMessage: TChatMessage = {
			id: `msg-${Date.now()}`,
			role: "user",
			content,
			timestamp: Date.now(),
		};

		// Add user message
		setSessions((prev) => ({
			...prev,
			[sessionId]: {
				...prev[sessionId],
				messages: [...prev[sessionId].messages, userMessage],
				updatedAt: Date.now(),
				title:
					prev[sessionId].messages.length === 0
						? content.slice(0, 30) + (content.length > 30 ? "..." : "")
						: prev[sessionId].title,
			},
		}));

		setIsLoading(true);

		try {
			const currentSession = sessions[sessionId];
			const conversationHistory = [...currentSession.messages, userMessage].map(
				(msg) => ({
					role: msg.role,
					content: msg.content,
				}),
			);

			const response = await generateChatResponse(conversationHistory);

			const assistantMessage: TChatMessage = {
				id: `msg-${Date.now()}-assistant`,
				role: "assistant",
				content: response,
				timestamp: Date.now(),
			};

			setSessions((prev) => ({
				...prev,
				[sessionId]: {
					...prev[sessionId],
					messages: [...prev[sessionId].messages, assistantMessage],
					updatedAt: Date.now(),
				},
			}));
		} catch (error) {
			const errorMessage: TChatMessage = {
				id: `msg-${Date.now()}-error`,
				role: "assistant",
				content:
					error instanceof Error
						? `Error: ${error.message}`
						: "An error occurred while processing your request.",
				timestamp: Date.now(),
				isError: true,
			};

			setSessions((prev) => ({
				...prev,
				[sessionId]: {
					...prev[sessionId],
					messages: [...prev[sessionId].messages, errorMessage],
					updatedAt: Date.now(),
				},
			}));
		} finally {
			setIsLoading(false);
		}
	};

	const clearHistory = (sessionId: string) => {
		setSessions((prev) => ({
			...prev,
			[sessionId]: {
				...prev[sessionId],
				messages: [],
				updatedAt: Date.now(),
			},
		}));
	};

	return (
		<ChatContext.Provider
			value={{
				sessions,
				activeSessionId,
				isOpen,
				isLoading,
				setIsOpen,
				createSession,
				deleteSession,
				setActiveSession,
				sendMessage,
				clearHistory,
				setSessions,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => {
	const ctx = useContext(ChatContext);
	if (!ctx) throw new Error("useChat must be used inside ChatProvider");
	return ctx;
};
