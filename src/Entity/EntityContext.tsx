import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { TSlug } from "@/Shared/SharedTypes";
import type { TEntity } from "./EntityTypes";

type EntitiesContextType = {
	entities: Record<TSlug, TEntity>;

	setEntities: React.Dispatch<React.SetStateAction<Record<TSlug, TEntity>>>;

	addEntity: (entity: TEntity) => void;
	updateEntity: (entity: TEntity) => void;
	removeEntity: (slug: TSlug) => void;
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

	const updateEntity = (entity: TEntity) => {
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

	return (
		<EntitiesContext.Provider
			value={{
				entities,
				setEntities,
				addEntity,
				updateEntity,
				removeEntity,
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
