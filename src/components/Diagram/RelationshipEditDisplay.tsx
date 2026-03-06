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

	const activeDiagram = activeDiagramSlug ? diagrams[activeDiagramSlug] : null;

	const relationships = activeDiagram ? activeDiagram.relationships : [];
	const nodes = activeDiagram ? activeDiagram.nodes : [];

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
			<h1 className="font-bold">Manage Relationships</h1>
			<div className="flex">
				<div className="flex flex-col">
					<label htmlFor="type">Type: </label>
					<select
						name="type"
						id="type"
						onChange={handleTypeChange}
						className="border rounded-md p-2"
					>
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
				</div>
				<div className="flex flex-col">
					<label htmlFor="source">Source: </label>
					<select
						name="source"
						id="source"
						onChange={handleSourceChange}
						className="border rounded-md p-2"
					>
						{!tempRelationship?.source && (
							<option selected value="">
								Select source
							</option>
						)}
						{Object.values(nodes).map((node) => (
							<option key={node.slug} value={node.slug}>
								{entities[node.slug]?.title || node.slug}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col">
					<label htmlFor="target">Target: </label>
					<select
						name="target"
						id="target"
						onChange={handleTargetChange}
						className="border rounded-md p-2"
					>
						{!tempRelationship?.target && (
							<option selected value="">
								Select target
							</option>
						)}
						{Object.values(nodes)
							.filter(
								(node) =>
									node.slug !== tempRelationship?.source &&
									!relationships.some(
										(r) =>
											r.source === tempRelationship?.source &&
											r.target === node.slug,
									),
							)
							.map((node) => (
								<option key={node.slug} value={node.slug}>
									{entities[node.slug]?.title || node.slug}
								</option>
							))}
					</select>
				</div>
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
			<div className="flex flex-col py-2">
				{relationships.map((rel) => (
					<div
						className="flex items-center justify-between mb-2"
						key={`${rel.source}_${rel.target}`}
					>
						<span className="px-2">{`${entities[rel.source]?.title || rel.source} --(${rel.type})-> ${entities[rel.target]?.title || rel.target}`}</span>
						<button
							type="button"
							className="px-2 py-1 bg-red-500 text-white rounded-md"
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
