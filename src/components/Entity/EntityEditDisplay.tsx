import type React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEntities } from "@/contexts/EntityContext";

const EntityEditDisplay = () => {
	const { slug } = useParams();
	const navigate = useNavigate();

	const {
		entities,
		updateEntityTitle,
		updateEntityDescription,
		updateEntitySlug,
		removeEntity,
	} = useEntities();
	const [tempEntity, setTempEntity] = useState(
		slug ? entities[slug] : undefined,
	);
	const [slugError, setSlugError] = useState<string | null>(null);

	if (!slug) return null;

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		if (typeof title !== "string") return;
		setTempEntity((prev) => (prev ? { ...prev, title } : prev));
	};
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const description = e.target.value;
		if (typeof description !== "string") return;
		setTempEntity((prev) => (prev ? { ...prev, description } : prev));
	};

	const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSlug = e.target.value;
		if (typeof newSlug !== "string") return;
		if (newSlug !== slug && entities[newSlug]) {
			setSlugError("Slug already exists!");
		} else {
			setSlugError(null);
		}
		setTempEntity((prev) => (prev ? { ...prev, slug: newSlug } : prev));
	};

	const handleSave = () => {
		if (slugError || !tempEntity) return;

		updateEntitySlug(slug, tempEntity.slug);
		updateEntityTitle(tempEntity.slug, tempEntity.title);
		updateEntityDescription(tempEntity.slug, tempEntity.description);
		navigate("/entity");
	};

	const handleDelete = () => {
		removeEntity(slug);
		navigate("/entity");
	};

	const handleCancel = () => {
		navigate("/entity");
	};

	return (
		<div className="flex p-4 size-full">
			<div className="flex flex-col size-full border rounded-xl bg-white">
				<div className="flex flex-col size-full p-4">
					<div className="flex flex-col">
						<label htmlFor="slug">Slug: </label>
						<input
							value={tempEntity?.slug}
							type="text"
							onChange={handleSlugChange}
						/>
						{slugError && (
							<span className="text-red-500 text-sm">{slugError}</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="title">Title: </label>
						<input
							value={tempEntity?.title}
							type="text"
							onChange={handleTitleChange}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="description">Description: </label>
						<input
							value={tempEntity?.description}
							type="text"
							onChange={handleDescriptionChange}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<button
							type="button"
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
							onClick={handleSave}
						>
							Save Entity
						</button>
						<button
							type="button"
							className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
							onClick={handleDelete}
						>
							Delete Entity
						</button>
						<button
							type="button"
							className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
							onClick={handleCancel}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EntityEditDisplay;
