import TEdge from "./edge";

type TLayer = {
	id: string;
	name: string;
	children: TLayer[];
	edges: TEdge[];
};

export default TLayer;