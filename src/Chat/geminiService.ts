// Gemini AI Service with Function Calling
// Using the @google/genai package

import type { TChatMessageRole } from "./ChatTypes";
import { toolDefinitions } from "./toolDefinitions";
import { toolExecutors } from "./toolExecutors";
import type {
	Tool,
	Schema,
	Content,
	GenerateContentConfig,
	Part,
	FunctionCall as GenAIFunctionCall,
} from "@google/genai";
import { GoogleGenAI } from "@google/genai";

// Get settings from localStorage
const getSettings = () => {
	try {
		const settings = localStorage.getItem("structsphere-settings");
		if (settings) {
			const parsed = JSON.parse(settings);
			return {
				apiKey: parsed.chat?.geminiApiKey || parsed.geminiApiKey || "",
				maxIterations: parsed.chat?.maxIterations || 5,
				model: parsed.chat?.model || "gemini-3-flash-preview",
			};
		}
	} catch (error) {
		console.error("Failed to get settings:", error);
	}
	return { apiKey: "", maxIterations: 5, model: "gemini-3-flash-preview" };
};

// System prompt to guide the AI agent
const SYSTEM_PROMPT = `You are a helpful AI assistant for StructSphere, a system modeling application. 

StructSphere allows users to:
- Create and manage Entities (types of things in their system)
- Create Diagrams (visual representations)
- Add Nodes to diagrams (instances of entities)
- Create Relationships between nodes

You have access to tools that let you query, create, and update the user's data. Use these tools when the user asks questions about their system or wants to create/modify things.

Guidelines:
- Be concise and helpful
- When showing data, format it clearly
- Use tools to get accurate information rather than guessing
- You can create and update entities, diagrams, nodes, and relationships directly using the available tools
- After creating or updating items, confirm the action to the user
- Be proactive in exploring related data when relevant
- When creating items, use descriptive and clear titles and descriptions`;

interface Message {
	role: TChatMessageRole;
	content: string;
}

interface FunctionResponse {
	name: string;
	response: {
		result?: unknown;
		error?: string;
	};
}

export async function generateChatResponse(
	conversationHistory: Message[],
): Promise<string> {
	const {
		apiKey,
		maxIterations: configuredMaxIterations,
		model,
	} = getSettings();

	if (!apiKey) {
		throw new Error(
			"Gemini API key not configured. Please add your API key in Settings.",
		);
	}

	try {
		const ai = new GoogleGenAI({ apiKey });

		// Convert tool definitions to Gemini format
		const tools: Tool[] = [
			{
				functionDeclarations: toolDefinitions.map(
					(tool: {
						name: string;
						description: string;
						parameters: Record<string, unknown>;
					}) => ({
						name: tool.name,
						description: tool.description,
						parameters: tool.parameters as unknown as Schema,
					}),
				),
			},
		];

		// Build chat history (exclude system messages, convert to Content format)
		const history: Content[] = conversationHistory
			.filter((msg) => msg.role !== "system")
			.slice(0, -1) // All but the last message
			.map((msg) => ({
				role: msg.role === "user" ? "user" : "model",
				parts: [{ text: msg.content }],
			}));

		// Configuration with tools and system instruction
		const config: GenerateContentConfig = {
			systemInstruction: SYSTEM_PROMPT,
			tools,
		};

		// Create chat session
		const chat = ai.chats.create({
			model,
			config,
			history,
		});

		// Get the last message
		const lastMessage =
			conversationHistory[conversationHistory.length - 1].content;

		// Send the message
		let response = await chat.sendMessage({ message: lastMessage });

		// Handle function calling loop
		let iterationsLeft = configuredMaxIterations; // Prevent infinite loops
		while (iterationsLeft > 0) {
			// Check if there are function calls
			const functionCalls = response.functionCalls;

			if (!functionCalls || functionCalls.length === 0) {
				// No more function calls, return final response
				return response.text || "";
			}

			// Execute each function call
			const functionResponses: FunctionResponse[] = functionCalls.map(
				(call: GenAIFunctionCall) => {
					const executor = toolExecutors[call.name || ""];
					if (!call.name || !executor) {
						return {
							name: call.name || "unknown",
							response: { error: `Unknown function: ${call.name}` },
						};
					}

					try {
						const result = executor(call.args || {});
						return {
							name: call.name,
							response: { result },
						};
					} catch (error) {
						return {
							name: call.name,
							response: {
								error: error instanceof Error ? error.message : "Unknown error",
							},
						};
					}
				},
			);

			// Build function response parts
			const functionResponseParts: Part[] = functionResponses.map(
				(fr: FunctionResponse) => ({
					functionResponse: {
						name: fr.name,
						response: fr.response,
					},
				}),
			);

			// Send function results back to the model
			response = await chat.sendMessage({ message: functionResponseParts });

			iterationsLeft--;
		}

		// If we hit max iterations, return what we have
		return response.text && response.text.length > 0
			? response.text
			: "I've completed the requested operations, but couldn't generate a final response.";
	} catch (error) {
		console.error("Gemini API Error:", error);
		if (error instanceof Error) {
			throw new Error(`Gemini API Error: ${error.message}`);
		}
		throw new Error("An unknown error occurred while calling the Gemini API");
	}
}
