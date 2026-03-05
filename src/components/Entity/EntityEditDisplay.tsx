import type React from "react";
import { useState } from "react";

const EntityEditDisplay = () => {
	// Mock entity data
	const [entity, updateEntity] = useState({
		slug: "entity-1",
		title: "Entity 1",
		description: "This is the first entity",
	});

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value;
		if (typeof title !== "string") return;
		updateEntity((prev) => ({
			...prev,
			title: title,
		}));
	};
	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const description = e.target.value;
		if (typeof description !== "string") return;
		updateEntity((prev) => ({
			...prev,
			description: description,
		}));
	};

	return (
		<div className="flex flex-col z-20 p-4 absolute right-0 top-0 w-1/5 min-w-72  h-full">
			<div className=" relative flex flex-col size-full border rounded-xl bg-white">
				<div className="flex flex-col size-full p-4">
					<div className="flex flex-col">
						<label htmlFor="title">Title: </label>
						<input
							defaultValue={entity.title}
							type="text"
							onChange={handleTitleChange}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="description">Description: </label>
						<input
							defaultValue={entity.description}
							type="text"
							onChange={handleDescriptionChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EntityEditDisplay;
