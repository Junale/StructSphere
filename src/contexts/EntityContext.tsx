import type React from "react";
import { createContext, useContext, useState } from "react";
import type { TEntity } from "../types/entity";
import type { TSlug } from "../types/shared";

type EntitiesState = Record<TSlug, TEntity>;

type EntitiesContextType = {
	entities: EntitiesState;

	addEntity: (entity: TEntity) => void;
	updateEntity: (entity: TEntity) => void;
	removeEntity: (slug: TSlug) => void;
	updateEntitySlug: (oldSlug: TSlug, newSlug: TSlug) => void;
};

const EntitiesContext = createContext<EntitiesContextType | null>(null);

export const EntitiesProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [entities, setEntities] = useState<EntitiesState>({});

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

	return (
		<EntitiesContext.Provider
			value={{
				entities,
				addEntity,
				updateEntity,
				removeEntity,
				updateEntitySlug,
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
