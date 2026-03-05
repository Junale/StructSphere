import type {
	TColor,
	TMetaData,
	TPosition,
	TRelationship,
	TSlug,
} from "@/types";

export const isColor = (color: unknown): color is TColor => {
	if (typeof color !== "string") return false;

	if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) return false;

	return true;
};

let counter = 0;
export const getSlug = (): TSlug => {
	return `component-${counter++}`;
};

export const getComponentCenterPosition = (metaData: TMetaData): TPosition => {
	return {
		x: metaData.position.x + metaData.size.width / 2,
		y: metaData.position.y + metaData.size.height / 2,
	};
};

export const getSlugsOfRelatedComponents = (
	slug: TSlug,
	relationships: Record<TSlug, TRelationship[]>,
): TSlug[] => {
	return (
		relationships[slug]?.flatMap((relationship) => {
			if (relationship.relatedComponentSlug === slug) {
				return [];
			}
			return [relationship.relatedComponentSlug];
		}) || []
	);
};
