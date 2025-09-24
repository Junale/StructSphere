export type TTitle = string;
export type TDescription = string;

export type TSize = {
    width: number;
    height: number;
}

export type TColor = string;

export type TPosition = {
    x: number;
    y: number;
}

export type TRelationshipType = 'association'
    | 'dependency'
    | 'inheritance'
    | 'aggregation'
    | 'composition';

export type TRelationship = {
    type: TRelationshipType;
    firstComponentId: string;
    secondComponentId: string;
}

export type TComponent = {
    id: number;
    title: TTitle;
    description: TDescription;
    size: TSize;
    color: TColor;
    position: TPosition;
    children: TComponent[];
    relationships: TRelationship[];
};