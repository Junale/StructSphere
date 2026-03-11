export type TPosition = {
	x: number;
	y: number;
};

export type TSize = {
	width: number;
	height: number;
};

export type TLayoutNode = {
	slug: string;
	position: TPosition;
	size: TSize;
};

export type TLayout = Record<string, TLayoutNode>;

export type TLayoutResult = {
	nodes: TLayout;
	edgeLabelOffsets: Record<string, { dx: number; dy: number }>;
};
