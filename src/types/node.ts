import type { TSlug } from "./shared";

export type TSize = {
	width: number;
	height: number;
};

export type TColor = string;

export type TPosition = {
	x: number;
	y: number;
};

export type TNode = {
	entitySlug: TSlug;
	position: TPosition;
	size: TSize;
	color?: TColor;
	subDiagram?: TSlug;
};
