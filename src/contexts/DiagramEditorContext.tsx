import type React from "react";
import { createContext, useContext, useMemo, useState } from "react";
import type { TNode } from "../types/node";
import type { TRelationship } from "../types/relationship";
import type { TSlug } from "../types/shared";
import { useDiagrams } from "./DiagramsContext";

type DiagramEditorContextType = {
	activeDiagramSlug: TSlug | null;
	setActiveDiagram: (slug: TSlug) => void;

	updateSlug: (newSlug: TSlug) => void;
	updateTitle: (title: string) => void;
	updateDescription: (description: string) => void;

	addNode: (node: TNode) => void;
	removeNode: (nodeSlug: TSlug) => void;

	addRelationship: (rel: TRelationship) => void;
	removeRelationship: (source: TSlug, target: TSlug) => void;
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

	const updateSlug = (newSlug: TSlug) => {
		if (!activeDiagram) return;

		update({
			...activeDiagram,
			slug: newSlug,
		});
	};

	const updateTitle = (title: string) => {
		if (!activeDiagram) return;

		update({
			...activeDiagram,
			title,
		});
	};

	const updateDescription = (description: string) => {
		if (!activeDiagram) return;

		update({
			...activeDiagram,
			description,
		});
	};

	const addNode = (node: TNode) => {
		if (!activeDiagram) return;

		update({
			...activeDiagram,
			nodes: [...activeDiagram.nodes, node],
		});
	};

	const removeNode = (nodeSlug: TSlug) => {
		if (!activeDiagram) return;

		const nodes = activeDiagram.nodes.filter((n) => n.slug !== nodeSlug);

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

	const removeRelationship = (source: TSlug, target: TSlug) => {
		if (!activeDiagram) return;

		const relationships = activeDiagram.relationships.filter(
			(r) => !(r.source === source && r.target === target),
		);

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
				updateSlug,
				updateTitle,
				updateDescription,
				addNode,
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
