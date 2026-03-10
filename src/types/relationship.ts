import type { TDescription, TSlug } from "./shared";

export type TRelationship = {
	slug: TSlug;
	diagramSlug: TSlug;
	sourceNodeSlug: TSlug;
	targetNodeSlug: TSlug;

	description?: TDescription;
};
