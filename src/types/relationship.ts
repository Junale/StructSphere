import type { TSlug } from "./shared";

export type TRelationshipType =
	| "association"
	| "dependency"
	| "inheritance"
	| "aggregation"
	| "composition";

export type TRelationship = {
	source: TSlug;
	target: TSlug;
	type: TRelationshipType;
};
