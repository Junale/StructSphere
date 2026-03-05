import type React from "react";
import { createContext, useContext, useMemo, useState } from "react";
import type { TNode } from "../types/node";
import type { TRelationship } from "../types/relationship";
import type { TSlug } from "../types/shared";
import { useDiagrams } from "./DiagramsContext";

type DiagramEditorContextType = {
	activeDiagramSlug: TSlug | null;

	setActiveDiagram: (slug: TSlug) => void;

	addNode: (nodeSlug: TSlug, node: TNode) => void;
	updateNode: (nodeSlug: TSlug, patch: Partial<TNode>) => void;
	removeNode: (nodeSlug: TSlug) => void;

	addRelationship: (rel: TRelationship) => void;
	removeRelationship: (index: number) => void;
};

const DiagramEditorContext = createContext<DiagramEditorContextType | null>(
	null,
);

export const DiagramEditorProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const { diagrams, updateDiagram } = useDiagrams();
	const [activeDiagramSlug, setActiveDiagramSlug] = useState<TSlug | null>(
		null,
	);

	const activeDiagram = useMemo(
		() => (activeDiagramSlug ? diagrams[activeDiagramSlug] : null),
		[activeDiagramSlug, diagrams],
	);

	const setActiveDiagram = (slug: TSlug) => {
		setActiveDiagramSlug(slug);
	};

	const update = (next: typeof activeDiagram) => {
		if (!next) return;
		updateDiagram(next);
	};

	const addNode = (nodeSlug: TSlug, node: TNode) => {
		if (!activeDiagram) return;

		update({
			...activeDiagram,
			nodes: {
				...activeDiagram.nodes,
				[nodeSlug]: node,
			},
		});
	};

	const updateNode = (nodeSlug: TSlug, patch: Partial<TNode>) => {
		if (!activeDiagram) return;

		update({
			...activeDiagram,
			nodes: {
				...activeDiagram.nodes,
				[nodeSlug]: {
					...activeDiagram.nodes[nodeSlug],
					...patch,
				},
			},
		});
	};

	const removeNode = (nodeSlug: TSlug) => {
		if (!activeDiagram) return;

		const nodes = { ...activeDiagram.nodes };
		delete nodes[nodeSlug];

		const relationships = activeDiagram.relationships.filter(
			(r) => r.source !== nodeSlug && r.target !== nodeSlug,
		);

		update({
			...activeDiagram,
			nodes,
			relationships,
		});
	};

	const addRelationship = (rel: TRelationship) => {
		if (!activeDiagram) return;

		update({
			...activeDiagram,
			relationships: [...activeDiagram.relationships, rel],
		});
	};

	const removeRelationship = (index: number) => {
		if (!activeDiagram) return;

		const relationships = [...activeDiagram.relationships];
		relationships.splice(index, 1);

		update({
			...activeDiagram,
			relationships,
		});
	};

	return (
		<DiagramEditorContext.Provider
			value={{
				activeDiagramSlug,
				setActiveDiagram,
				addNode,
				updateNode,
				removeNode,
				addRelationship,
				removeRelationship,
			}}
		>
			{children}
		</DiagramEditorContext.Provider>
	);
};

export const useDiagramEditor = () => {
	const ctx = useContext(DiagramEditorContext);
	if (!ctx)
		throw new Error(
			"useDiagramEditor must be used inside DiagramEditorProvider",
		);
	return ctx;
};
