import { useParams } from "react-router-dom";
import ViewDisplay from "@/Shared/Components/ViewDisplay";
import { useEntities } from "../EntityContext";

const EntityViewDisplay = () => {
	const { slug } = useParams();
	const { entities } = useEntities();

	if (!slug) return null;
	const entity = entities[slug];
	if (!entity) return <div>Entity not found</div>;

	return (
		<ViewDisplay
			itemType="entity"
			updateTo={`/entity/${slug}/update`}
			backTo="/entity"
		>
			<div className="flex flex-col size-full p-4">
				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Slug:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 break-all">
						{entity.slug}
					</p>
				</div>

				<div className="mb-4">
					<p className="mb-2 font-semibold text-slate-700">Title:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800">
						{entity.title}
					</p>
				</div>

				<div>
					<p className="mb-2 font-semibold text-slate-700">Description:</p>
					<p className="px-4 py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 whitespace-pre-wrap break-words">
						{entity.description}
					</p>
				</div>
			</div>
		</ViewDisplay>
	);
};

export default EntityViewDisplay;
