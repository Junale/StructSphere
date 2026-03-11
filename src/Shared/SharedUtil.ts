import type { TRelationship } from "@/Relationship/RelationshipTypes";
import type { TSlug } from "@/Shared/SharedTypes";
import type { TLayoutNode, TPosition } from "@/Visualizer/layoutTypes";

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
