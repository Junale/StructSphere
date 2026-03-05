import type { TNode } from "./node";
import type { TRelationship } from "./Relationsship";
import type { TDescription, TSlug, TTitle } from "./shared";

export type TDiagram = {
	slug: TSlug;
	title: TTitle;
	description: TDescription;

	nodes: TNode[];
	relationships: TRelationship[];
};
