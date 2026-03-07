import type { TLayoutNode, TPosition } from "@/types/layout";
import type { TColor } from "@/types/node";
import type { TRelationship } from "@/types/relationship";
import type { TSlug } from "@/types/shared";

export const isColor = (color: unknown): color is TColor => {
	if (typeof color !== "string") return false;

	if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) return false;

	return true;
};

let counter = 0;
export const getSlug = (): TSlug => {
	return `component-${counter++}`;
};

export const getComponentCenterPosition = (simNode: TLayoutNode): TPosition => {
	return {
		x: simNode.position.x + simNode.size.width / 2,
		y: simNode.position.y + simNode.size.height / 2,
	};
};

export const getSlugsOfRelatedComponents = (
	slug: TSlug,
	relationships: Record<TSlug, TRelationship[]>,
): TSlug[] => {
	return (
		relationships[slug]?.flatMap((relationship) => {
			if (relationship.source === slug) {
				return [relationship.target];
			}
			return [relationship.source];
		}) || []
	);
};
