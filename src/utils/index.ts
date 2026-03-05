import type { TColor, TComponent, TPosition, TRelationship } from "@/types";

export const isColor = (color: unknown): color is TColor => {
	if (typeof color !== "string") return false;

	if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) return false;

	return true;
};

let counter = 0;
export const getId = (): number => {
	return counter++;
};

export const getComponentCenterPosition = (
	component: TComponent,
): TPosition => {
	return {
		x: component.position.x + component.size.width / 2,
		y: component.position.y + component.size.height / 2,
	};
};

export const getIdsOfRelatedComponents = (
	id: number,
	relationships: TRelationship[],
): number[] => {
	return relationships
		.filter((relationship) => {
			return (
				relationship.firstComponentId === id ||
				relationship.secondComponentId === id
			);
		})
		.map((relationship) => {
			if (relationship.firstComponentId === id)
				return relationship.secondComponentId;
			return relationship.firstComponentId;
		});
};
