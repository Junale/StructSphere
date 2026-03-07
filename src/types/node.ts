import type { TSlug } from "./shared";

export type TColor = string;

export type TNode = {
	slug: TSlug;
	color?: TColor;
	subDiagram?: TSlug;
};
