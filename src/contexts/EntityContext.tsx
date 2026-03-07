import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { TEntity } from "../types/entity";
import type { TSlug } from "../types/shared";

type EntitiesContextType = {
	entities: Record<TSlug, TEntity>;

	setEntities: React.Dispatch<React.SetStateAction<Record<TSlug, TEntity>>>;

	addEntity: (entity: TEntity) => void;
	removeEntity: (slug: TSlug) => void;

	updateEntityTitle: (slug: TSlug, title: string) => void;
	updateEntityDescription: (slug: TSlug, description: string) => void;
	updateEntitySlug: (oldSlug: TSlug, newSlug: TSlug) => void;
};

const EntitiesContext = createContext<EntitiesContextType | null>(null);

const STORAGE_KEY = "structsphere-entities";

export const EntitiesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [entities, setEntities] = useState<Record<TSlug, TEntity>>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
		} catch (error) {
			console.error("Failed to save entities to localStorage:", error);
		}
	}, [entities]);

	const addEntity = (entity: TEntity) => {
		setEntities((prev) => ({
			...prev,
			[entity.slug]: entity,
		}));
	};

	const removeEntity = (slug: TSlug) => {
		setEntities((prev) => {
			const next = { ...prev };
			delete next[slug];
			return next;
		});
	};

	const updateEntitySlug = (oldSlug: TSlug, newSlug: TSlug) => {
		setEntities((prev) => {
			const next = { ...prev };
			const entity = next[oldSlug];
			if (entity) {
				delete next[oldSlug];
				next[newSlug] = { ...entity, slug: newSlug };
			}
			return next;
		});
	};

	const updateEntityTitle = (slug: TSlug, title: string) => {
		setEntities((prev) => {
			const next = { ...prev };
			const entity = next[slug];
			if (entity) {
				next[slug] = { ...entity, title };
			}
			return next;
		});
	};

	const updateEntityDescription = (slug: TSlug, description: string) => {
		setEntities((prev) => {
			const next = { ...prev };
			const entity = next[slug];
			if (entity) {
				next[slug] = { ...entity, description };
			}
			return next;
		});
	};

	return (
		<EntitiesContext.Provider
			value={{
				entities,
				setEntities,
				addEntity,
				removeEntity,
				updateEntitySlug,
				updateEntityTitle,
				updateEntityDescription,
			}}
		>
			{children}
		</EntitiesContext.Provider>
	);
};

export const useEntities = () => {
	const ctx = useContext(EntitiesContext);
	if (!ctx) throw new Error("useEntities must be used inside EntitiesProvider");
	return ctx;
};
