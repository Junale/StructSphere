import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { TSlug } from "@/Shared/SharedTypes";
import type { TDiagram } from "./DiagramTypes";

type DiagramsContextType = {
	diagrams: Record<TSlug, TDiagram>;

	setDiagrams: React.Dispatch<React.SetStateAction<Record<TSlug, TDiagram>>>;

	addDiagram: (diagram: TDiagram) => void;
	updateDiagram: (diagram: TDiagram) => void;
	removeDiagram: (slug: TSlug) => void;
};

const DiagramsContext = createContext<DiagramsContextType | null>(null);

const STORAGE_KEY = "structsphere-diagrams";

export const DiagramsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [diagrams, setDiagrams] = useState<Record<TSlug, TDiagram>>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(diagrams));
		} catch (error) {
			console.error("Failed to save diagrams to localStorage:", error);
		}
	}, [diagrams]);

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
			value={{
				diagrams,
				setDiagrams,
				addDiagram,
				updateDiagram,
				removeDiagram,
			}}
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
