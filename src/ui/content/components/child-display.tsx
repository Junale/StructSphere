import TLayer from "@/logic/type/models/layer";
import Draggable from "react-draggable";

type props = {
	child: TLayer;
};

const ChildDisplay = ({ child }: props) => (
	<Draggable 	>

		<div className="size-12 bg-slate-400">
			{child.name}
		</div>
	</Draggable>
);

export default ChildDisplay;