import { useParams } from "react-router-dom";
import { useEntities } from "@/contexts/EntityContext";
import UpdateDisplay from "../Shared/UpdateDisplay";

const EntityUpdateDisplay = () => {
	const { slug } = useParams();

	const { entities, updateEntity } = useEntities();

	if (!slug) return null;
	const entity = entities[slug];
	if (!entity) return <div>Entity not found</div>;

	const handleSubmit = (
		elements: HTMLFormControlsCollection,
	): null | string => {
		const title = elements.namedItem("title");
		if (!title || !("value" in title)) return "Error validating title";
		const description = elements.namedItem("description");
		if (!description || !("value" in description))
			return "Error validating description";

		updateEntity({
			slug: slug,
			title: title.value,
			description: description.value,
		});
		return null;
	};

	return (
		<UpdateDisplay itemType="entity" onSubmit={handleSubmit}>
			<div className="flex flex-col size-full p-4">
				<label htmlFor="slug" className="mb-2 font-semibold">
					Slug:
				</label>
				<input
					id="slug"
					type="text"
					placeholder="Enter slug"
					value={slug}
					disabled
					className="bg-gray-200 cursor-not-allowed"
				/>
				<label htmlFor="title" className="mb-2 mt-4 font-semibold">
					Title:
				</label>
				<input
					id="title"
					type="text"
					placeholder="Enter title"
					defaultValue={entity.title}
				/>
				<label htmlFor="description" className="mb-2 mt-4 font-semibold">
					Description:
				</label>
				<input
					id="description"
					type="text"
					placeholder="Enter description"
					defaultValue={entity.description}
				/>
			</div>
		</UpdateDisplay>
	);
};

export default EntityUpdateDisplay;
