import type { TLayoutNode, TPosition } from "@/types/layout";
import type { TRelationship } from "@/types/relationship";
import type { TSlug } from "@/types/shared";

export const getSlug = (): TSlug => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
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
			if (relationship.sourceNodeSlug === slug) {
				return [relationship.targetNodeSlug];
			}
			return [relationship.sourceNodeSlug];
		}) || []
	);
};

export const upperFirstChar = (item: string) => {
	return item.charAt(0).toUpperCase() + item.slice(1);
};
