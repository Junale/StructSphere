export type TChatMessageRole = "user" | "assistant" | "system";

export type TChatMessage = {
	id: string;
	role: TChatMessageRole;
	content: string;
	timestamp: number;
	isError?: boolean;
	functionCalls?: TFunctionCall[];
};

export type TFunctionCall = {
	name: string;
	args: Record<string, unknown>;
	result?: unknown;
};

export type TChatSession = {
	id: string;
	title: string;
	messages: TChatMessage[];
	createdAt: number;
	updatedAt: number;
};

export type TChatState = {
	sessions: Record<string, TChatSession>;
	activeSessionId: string | null;
	isOpen: boolean;
	isLoading: boolean;
};
