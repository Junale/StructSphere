import { useParams } from "react-router-dom";
import LabeledTextAreaField from "@/Shared/Components/LabeledTextAreaField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import UpdateDisplay from "@/Shared/Components/UpdateDisplay";
import { useEntities } from "../EntityContext";

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
			<div className="flex flex-col size-full p-4 gap-4">
				<LabeledTextField
					id="slug"
					label="Slug"
					placeholder="Enter slug"
					value={slug}
					disabled
				/>
				<LabeledTextField
					id="title"
					label="Title"
					placeholder="Enter title"
					defaultValue={entity.title}
				/>
				<LabeledTextAreaField
					id="description"
					label="Description"
					placeholder="Enter description"
					defaultValue={entity.description}
				/>
			</div>
		</UpdateDisplay>
	);
};

export default EntityUpdateDisplay;
