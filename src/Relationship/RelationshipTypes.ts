import type { TDescription, TSlug } from "@/Shared/SharedTypes";

export type TRelationship = {
	slug: TSlug;
	diagramSlug: TSlug;
	sourceNodeSlug: TSlug;
	targetNodeSlug: TSlug;

	description?: TDescription;
};
