import type { TEntity, TMetaData } from "@/types";

type props = {
	entity: TEntity;
	metaData: TMetaData;
};

const EntityVisualizerDisplay = ({ entity, metaData }: props) => {
	return (
		<div
			className="p-2 border rounded shadow-sm overflow-hidden z-10"
			style={{
				width: metaData.size.width,
				height: metaData.size.height,
				backgroundColor: metaData.color,
				position: "absolute",
				left: metaData.position.x,
				top: metaData.position.y,
			}}
		>
			<h2 className="text-lg font-semibold">{entity.title}</h2>
			<p className="text-sm">{entity.description}</p>
		</div>
	);
};

export default EntityVisualizerDisplay;
