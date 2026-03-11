import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { TSlug } from "../Shared/SharedTypes";
import type { TNode } from "./NodeTypes";

type NodesContextType = {
	nodes: Record<TSlug, TNode>;

	setNodes: React.Dispatch<React.SetStateAction<Record<TSlug, TNode>>>;

	addNode: (node: TNode) => void;
	updateNode: (node: TNode) => void;
	removeNode: (slug: TSlug) => void;
};

const NodesContext = createContext<NodesContextType | null>(null);

const STORAGE_KEY = "structsphere-nodes";

export const NodesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [nodes, setNodes] = useState<Record<TSlug, TNode>>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
		} catch (error) {
			console.error("Failed to save nodes to localStorage:", error);
		}
	}, [nodes]);

	const addNode = (node: TNode) => {
		setNodes((prev) => ({
			...prev,
			[node.slug]: node,
		}));
	};

	const updateNode = (node: TNode) => {
		setNodes((prev) => ({
			...prev,
			[node.slug]: node,
		}));
	};

	const removeNode = (slug: TSlug) => {
		setNodes((prev) => {
			const next = { ...prev };
			delete next[slug];
			return next;
		});
	};

	return (
		<NodesContext.Provider
			value={{
				nodes,
				setNodes,
				addNode,
				updateNode,
				removeNode,
			}}
		>
			{children}
		</NodesContext.Provider>
	);
};

export const useNodes = () => {
	const ctx = useContext(NodesContext);
	if (!ctx) throw new Error("useNodes must be used inside NodesProvider");
	return ctx;
};
