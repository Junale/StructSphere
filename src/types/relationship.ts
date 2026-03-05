import type { TSlug } from "./shared";

export const relationshipTypes = [
	"association",
	"dependency",
	"inheritance",
	"aggregation",
	"composition",
] as const;

export type TRelationshipType = (typeof relationshipTypes)[number];

export type TRelationship = {
	source: TSlug;
	target: TSlug;
	type: TRelationshipType;
};
