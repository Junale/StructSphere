import type React from "react";
import { createContext, useContext, useState } from "react";
import type { TDiagram } from "../types/diagram";
import type { TSlug } from "../types/shared";

type DiagramsState = Record<TSlug, TDiagram>;

type DiagramsContextType = {
	diagrams: DiagramsState;

	addDiagram: (diagram: TDiagram) => void;
	updateDiagram: (diagram: TDiagram) => void;
	removeDiagram: (slug: TSlug) => void;
};

const DiagramsContext = createContext<DiagramsContextType | null>(null);

export const DiagramsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [diagrams, setDiagrams] = useState<DiagramsState>({});

	const addDiagram = (diagram: TDiagram) => {
		setDiagrams((prev) => ({
			...prev,
			[diagram.slug]: diagram,
		}));
	};

	const updateDiagram = (diagram: TDiagram) => {
		setDiagrams((prev) => ({
			...prev,
			[diagram.slug]: diagram,
		}));
	};

	const removeDiagram = (slug: TSlug) => {
		setDiagrams((prev) => {
			const next = { ...prev };
			delete next[slug];
			return next;
		});
	};

	return (
		<DiagramsContext.Provider
			value={{ diagrams, addDiagram, updateDiagram, removeDiagram }}
		>
			{children}
		</DiagramsContext.Provider>
	);
};

export const useDiagrams = () => {
	const ctx = useContext(DiagramsContext);
	if (!ctx) throw new Error("useDiagrams must be used inside DiagramsProvider");
	return ctx;
};
