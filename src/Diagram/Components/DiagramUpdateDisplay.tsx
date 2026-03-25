import { useParams } from "react-router-dom";
import LabeledTextAreaField from "@/Shared/Components/LabeledTextAreaField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import UpdateDisplay from "@/Shared/Components/UpdateDisplay";
import { useDiagrams } from "../DiagramsContext";

const DiagramUpdateDisplay = () => {
	const { slug } = useParams();
	const { diagrams, updateDiagram } = useDiagrams();

	if (!slug) return null;
	const diagram = diagrams[slug];
	if (!diagram) return <div>Diagram not found</div>;

	const handleSubmit = (
		elements: HTMLFormControlsCollection,
	): null | string => {
		const title = elements.namedItem("title");
		if (!title || !("value" in title)) return "Error validating title";
		const description = elements.namedItem("description");
		if (!description || !("value" in description))
			return "Error validating description";

		updateDiagram({
			slug: slug,
			title: title.value,
			description: description.value,
		});
		return null;
	};

	return (
		<UpdateDisplay itemType="diagram" onSubmit={handleSubmit}>
			<div className="flex flex-col size-full p-4">
				<LabeledTextField
					id="slug"
					label="Slug"
					placeholder="Enter slug"
					value={slug}
					disabled
				/>
				<div className="mt-4">
					<LabeledTextField
						id="title"
						label="Title"
						placeholder="Enter title"
						defaultValue={diagram.title}
					/>
				</div>
				<div className="mt-4">
					<LabeledTextAreaField
						id="description"
						label="Description"
						placeholder="Enter description"
						defaultValue={diagram.description}
					/>
				</div>
			</div>
		</UpdateDisplay>
	);
};
export default DiagramUpdateDisplay;
