import type { TLayoutNode, TPosition } from "@/types/layout";
import type { TRelationship } from "@/types/relationship";
import type { TSlug } from "@/types/shared";

let counter = 0;
export const getSlug = (): TSlug => {
	return `component-${counter++}`;
};

export const getCenterPosition = (simNode: TLayoutNode): TPosition => {
	return {
		x: simNode.position.x + simNode.size.width / 2,
		y: simNode.position.y + simNode.size.height / 2,
	};
};

export const getSlugsOfTarget = (
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
