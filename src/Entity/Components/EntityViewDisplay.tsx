import { useParams } from "react-router-dom";
import LabeledTextAreaField from "@/Shared/Components/LabeledTextAreaField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import ViewDisplay from "@/Shared/Components/ViewDisplay";
import { useEntities } from "../EntityContext";

const EntityViewDisplay = () => {
	const { slug } = useParams();
	const { entities } = useEntities();

	if (!slug) return null;
	const entity = entities[slug];
	if (!entity) return <div>Entity not found</div>;

	return (
		<ViewDisplay itemType="entity">
			<div className="flex flex-col size-full p-4">
				<LabeledTextField id="slug" label="Slug" value={entity.slug} disabled />
				<div className="mt-4">
					<LabeledTextField
						id="title"
						label="Title"
						value={entity.title}
						disabled
					/>
				</div>
				<div className="mt-4">
					<LabeledTextAreaField
						id="description"
						label="Description"
						value={entity.description}
						disabled
					/>
				</div>
			</div>
		</ViewDisplay>
	);
};

export default EntityViewDisplay;
