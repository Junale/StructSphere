import TEdge from "./edge";
import TLocation from "./location";

type TLayer = {
	id: number;
	name: string;
	location: TLocation;
	width: number;
	height: number;
	children: TLayer[];
	edges: TEdge[];
};

export default TLayer;