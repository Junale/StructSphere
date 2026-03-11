import type { TSlug } from "@/Shared/SharedTypes";

export type TNode = {
	slug: TSlug;
	entitySlug: TSlug;
	diagramSlug: TSlug;

	subDiagramSlug?: TSlug;
};
