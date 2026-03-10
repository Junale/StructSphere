import { useDiagrams } from "@/contexts/DiagramsContext";
import { getSlug } from "@/utils";
import AddDisplay from "../Shared/AddDisplay";

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
				<label htmlFor="slug" className="mb-2 font-semibold">
					Slug:
				</label>
				<input
					id="slug"
					type="text"
					placeholder="Enter slug"
					defaultValue={`diagram-${getSlug()}`}
				/>
				<label htmlFor="title" className="mb-2 mt-4 font-semibold">
					Title:
				</label>
				<input id="title" type="text" placeholder="Enter title" />
				<label htmlFor="description" className="mb-2 mt-4 font-semibold">
					Description:
				</label>
				<input id="description" type="text" placeholder="Enter description" />
			</div>
		</AddDisplay>
	);
};

export default DiagramAddDisplay;
