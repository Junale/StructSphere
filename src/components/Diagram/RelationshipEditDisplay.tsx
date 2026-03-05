import { useEffect, useState } from "react";
import { useDiagramEditor } from "@/contexts/DiagramEditorContext";
import { useDiagrams } from "@/contexts/DiagramsContext";
import { useEntities } from "@/contexts/EntityContext";
import type { TRelationship } from "@/types/relationship";
import { relationshipTypes } from "@/types/relationship";

const RelationshipEditDisplay = () => {
	const { diagrams } = useDiagrams();
	const { addRelationship, activeDiagramSlug, removeRelationship } =
		useDiagramEditor();
	const { entities } = useEntities();
	const [tempRelationship, setTempRelationship] =
		useState<Partial<TRelationship> | null>(null);
	const relationships = activeDiagramSlug
		? diagrams[activeDiagramSlug].relationships
		: [];

	useEffect(() => {
		console.log(tempRelationship);
	}, [tempRelationship]);

	if (!activeDiagramSlug) return <div>No active diagram selected.</div>;

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const type = e.target.value as TRelationship["type"];
		setTempRelationship((prev) => (prev ? { ...prev, type } : { type }));
	};

	const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const source = e.target.value;
		setTempRelationship((prev) => (prev ? { ...prev, source } : { source }));
	};

	const handleTargetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const target = e.target.value;
		setTempRelationship((prev) => (prev ? { ...prev, target } : { target }));
	};

	const handleAddRelationship = () => {
		addRelationship(tempRelationship as TRelationship);
		setTempRelationship(null);
	};

	return (
		<div className="flex flex-col w-full h-full p-4 border rounded-lg shadow-md">
			RelationshipEditDisplay
			<div className="flex">
				<label htmlFor="type">Type: </label>
				<select name="type" id="type" onChange={handleTypeChange}>
					{!tempRelationship?.type && (
						<option selected value="">
							Select type
						</option>
					)}
					{relationshipTypes.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
				<label htmlFor="source">Source: </label>
				<select name="source" id="source" onChange={handleSourceChange}>
					{!tempRelationship?.source && (
						<option selected value="">
							Select source
						</option>
					)}
					{Object.values(entities).map((entity) => (
						<option key={entity.slug} value={entity.slug}>
							{entity.title}
						</option>
					))}
				</select>
				<label htmlFor="target">Target: </label>
				<select name="target" id="target" onChange={handleTargetChange}>
					{!tempRelationship?.target && (
						<option selected value="">
							Select target
						</option>
					)}
					{Object.values(entities).map((entity) => (
						<option key={entity.slug} value={entity.slug}>
							{entity.title}
						</option>
					))}
				</select>

				<button
					type="button"
					onClick={handleAddRelationship}
					className={
						"ml-2 px-2 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400    disabled:cursor-not-allowed"
					}
					disabled={
						!tempRelationship?.type ||
						!tempRelationship?.source ||
						!tempRelationship?.target
					}
				>
					Add Relationship
				</button>
			</div>
			<div>
				{relationships.map((rel) => (
					<div key={`${rel.source}_${rel.target}`}>
						<span>{`${rel.source} --(${rel.type})-> ${rel.target}`}</span>
						<button
							type="button"
							onClick={() => removeRelationship(rel.source, rel.target)}
						>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default RelationshipEditDisplay;
