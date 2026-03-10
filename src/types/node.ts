import type { TSlug } from "./shared";

export type TNode = {
	slug: TSlug;
	entitySlug: TSlug;
	diagramSlug: TSlug;

	subDiagramSlug?: TSlug;
};
