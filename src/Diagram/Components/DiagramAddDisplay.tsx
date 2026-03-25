import AddDisplay from "@/Shared/Components/AddDisplay";
import LabeledTextAreaField from "@/Shared/Components/LabeledTextAreaField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import { getSlug } from "@/Shared/SharedUtil";
import { useDiagrams } from "../DiagramsContext";

const DiagramAddDisplay = () => {
	const { addDiagram } = useDiagrams();

	const handleSubmit = (
		elements: HTMLFormControlsCollection,
	): null | string => {
		const slug = elements.namedItem("slug");
		if (!slug || !("value" in slug)) return "Error validating slug";
		const title = elements.namedItem("title");
		if (!title || !("value" in title)) return "Error validating title";
		const description = elements.namedItem("description");
		if (!description || !("value" in description))
			return "Error validating description";

		addDiagram({
			slug: slug.value,
			title: title.value,
			description: description.value,
		});
		return null;
	};

	return (
		<AddDisplay itemType="diagram" onSubmit={handleSubmit}>
			<div className="flex flex-col size-full p-4">
				<LabeledTextField
					id="slug"
					label="Slug"
					placeholder="Enter slug"
					defaultValue={`diagram-${getSlug()}`}
				/>
				<div className="mt-4">
					<LabeledTextField
						id="title"
						label="Title"
						placeholder="Enter title"
					/>
				</div>
				<div className="mt-4">
					<LabeledTextAreaField
						id="description"
						label="Description"
						placeholder="Enter description"
					/>
				</div>
			</div>
		</AddDisplay>
	);
};

export default DiagramAddDisplay;
