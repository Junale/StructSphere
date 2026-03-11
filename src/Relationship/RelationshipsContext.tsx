import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { TSlug } from "@/Shared/SharedTypes";
import type { TRelationship } from "./RelationshipTypes";

type RelationshipsContextType = {
	relationships: Record<TSlug, TRelationship>;

	setRelationships: React.Dispatch<
		React.SetStateAction<Record<TSlug, TRelationship>>
	>;

	addRelationship: (relationship: TRelationship) => void;
	updateRelationship: (relationship: TRelationship) => void;
	removeRelationship: (slug: TSlug) => void;
};

const RelationshipsContext = createContext<RelationshipsContextType | null>(
	null,
);

const STORAGE_KEY = "structsphere-relationships";

export const RelationshipsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [relationships, setRelationships] = useState<
		Record<TSlug, TRelationship>
	>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(relationships));
		} catch (error) {
			console.error("Failed to save relationships to localStorage:", error);
		}
	}, [relationships]);

	const addRelationship = (relationship: TRelationship) => {
		setRelationships((prev) => ({
			...prev,
			[relationship.slug]: relationship,
		}));
	};

	const updateRelationship = (relationship: TRelationship) => {
		setRelationships((prev) => ({
			...prev,
			[relationship.slug]: relationship,
		}));
	};

	const removeRelationship = (slug: TSlug) => {
		setRelationships((prev) => {
			const next = { ...prev };
			delete next[slug];
			return next;
		});
	};

	return (
		<RelationshipsContext.Provider
			value={{
				relationships,
				setRelationships,
				addRelationship,
				updateRelationship,
				removeRelationship,
			}}
		>
			{children}
		</RelationshipsContext.Provider>
	);
};

export const useRelationships = () => {
	const ctx = useContext(RelationshipsContext);
	if (!ctx)
		throw new Error(
			"useRelationships must be used inside RelationshipsProvider",
		);
	return ctx;
};
