// MetaData types
export type TSize = {
	width: number;
	height: number;
};

export type TColor = string;

export type TPosition = {
	x: number;
	y: number;
};

export type TMetaData = {
	size: TSize;
	color: TColor;
	position: TPosition;
};

// Diagram types
export type TRelationshipType =
	| "association"
	| "dependency"
	| "inheritance"
	| "aggregation"
	| "composition";

export type TRelationship = {
	type: TRelationshipType;
	relatedEntitySlug: TSlug;
};

export type TDiagram = {
	slug: TSlug;
	title: TTitle;
	description: TDescription;
	entityMetaData: Record<TSlug, TMetaData>;
	relationships: Record<TSlug, TRelationship[]>;
	subDiagrams: Record<TSlug, TDiagram>;
};

// Entity types
export type TSlug = string;
export type TTitle = string;
export type TDescription = string;

export type TEntity = {
	slug: TSlug;
	title: TTitle;
	description: TDescription;
};
