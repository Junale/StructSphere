import TEdge from "./edge";

type TLayer = {
	id: number;
	name: string;
	children: TLayer[];
	edges: TEdge[];
};

export default TLayer;