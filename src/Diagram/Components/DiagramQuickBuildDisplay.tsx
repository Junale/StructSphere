import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEntities } from "@/Entity/EntityContext";
import { useNodes } from "@/Node/NodesContext";
import { useRelationships } from "@/Relationship/RelationshipsContext";
import CloseIcon from "@/Shared/Components/Icons/CloseIcon";
import LabeledSelectField from "@/Shared/Components/LabeledSelectField";
import LabeledTextField from "@/Shared/Components/LabeledTextField";
import { getSlug } from "@/Shared/SharedUtil";
import { useDiagrams } from "../DiagramsContext";

const DiagramQuickBuildDisplay = () => {
	const { slug } = useParams();
	const { diagrams } = useDiagrams();
	const { entities, addEntity } = useEntities();
	const { nodes, addNode, removeNode } = useNodes();
	const { relationships, addRelationship, removeRelationship } =
		useRelationships();

	const [entityAndNodeFormKey, setEntityAndNodeFormKey] = useState(0);
	const [nodeFormKey, setNodeFormKey] = useState(0);
	const [relationshipFormKey, setRelationshipFormKey] = useState(0);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [selectedSourceNodeSlug, setSelectedSourceNodeSlug] =
		useState<string>("");

	const diagram = slug ? diagrams[slug] : undefined;

	const diagramNodes = useMemo(() => {
		if (!slug) return [];
		return Object.values(nodes).filter((node) => node.diagramSlug === slug);
	}, [slug, nodes]);

	const diagramRelationships = useMemo(() => {
		if (!slug) return [];
		return Object.values(relationships).filter(
			(relationship) => relationship.diagramSlug === slug,
		);
	}, [slug, relationships]);

	if (!slug) {
		return <div className="p-4">Diagram slug is required.</div>;
	}

	if (!diagram) {
		return <div className="p-4">Diagram not found.</div>;
	}

	const handleCreateEntityAndNode = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage(null);
		setError(null);

		const elements = e.currentTarget.elements;
		const entityTitle = elements.namedItem("entityTitle");

		if (!entityTitle || !("value" in entityTitle)) {
			setError("Could not read entity name.");
			return;
		}

		const entityTitleValue = entityTitle.value.trim();
		if (!entityTitleValue) {
			setError("Please enter an entity name.");
			return;
		}

		if (
			Object.values(entities).some(
				(entity) =>
					entity.title.toLowerCase() === entityTitleValue.toLowerCase(),
			)
		) {
			setError("An entity with that name already exists.");
			return;
		}

		const entitySlug = `entity-${getSlug()}`;
		const nodeSlug = `node-${getSlug()}`;

		addEntity({
			slug: entitySlug,
			title: entityTitleValue,
			description: "",
		});

		addNode({
			slug: nodeSlug,
			diagramSlug: slug,
			entitySlug,
			subDiagramSlug: undefined,
		});

		setMessage("Entity and node created.");
		setEntityAndNodeFormKey((k) => k + 1);
	};

	const handleAddNode = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage(null);
		setError(null);

		const elements = e.currentTarget.elements;
		const entitySlug = elements.namedItem("entitySlug");

		if (!entitySlug || !("value" in entitySlug) || !entitySlug.value) {
			setError("Please choose an entity.");
			return;
		}

		const nodeSlug = `node-${getSlug()}`;

		if (
			diagramNodes.some(
				(node) =>
					node.diagramSlug === slug && node.entitySlug === entitySlug.value,
			)
		) {
			setError("That entity is already present in this diagram.");
			return;
		}

		addNode({
			slug: nodeSlug,
			diagramSlug: slug,
			entitySlug: entitySlug.value,
			subDiagramSlug: undefined,
		});

		setMessage("Node added.");
		setNodeFormKey((k) => k + 1);
	};

	const handleAddRelationship = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessage(null);
		setError(null);

		const elements = e.currentTarget.elements;
		const sourceNodeSlug = elements.namedItem("sourceNodeSlug");
		const targetNodeSlug = elements.namedItem("targetNodeSlug");
		const description = elements.namedItem("description");

		if (
			!sourceNodeSlug ||
			!("value" in sourceNodeSlug) ||
			!sourceNodeSlug.value
		) {
			setError("Please choose a source node.");
			return;
		}

		if (
			!targetNodeSlug ||
			!("value" in targetNodeSlug) ||
			!targetNodeSlug.value
		) {
			setError("Please choose a target node.");
			return;
		}

		if (sourceNodeSlug.value === targetNodeSlug.value) {
			setError("Source and target must be different nodes.");
			return;
		}

		const relationshipSlug = `relationship-${getSlug()}`;

		if (
			diagramRelationships.some(
				(relationship) =>
					relationship.sourceNodeSlug === sourceNodeSlug.value &&
					relationship.targetNodeSlug === targetNodeSlug.value,
			)
		) {
			setError("That relationship already exists in this diagram.");
			return;
		}

		const descriptionValue =
			description && "value" in description ? description.value : "";

		addRelationship({
			slug: relationshipSlug,
			diagramSlug: slug,
			sourceNodeSlug: sourceNodeSlug.value,
			targetNodeSlug: targetNodeSlug.value,
			description: descriptionValue || undefined,
		});

		setMessage("Relationship added.");
		setRelationshipFormKey((k) => k + 1);
		setSelectedSourceNodeSlug("");
	};

	return (
		<div className="flex flex-col w-full flex-1 overflow-y-auto bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 p-6">
			<div className="max-w-6xl mx-auto w-full space-y-6">
				<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div>
							<h1 className="text-2xl font-bold text-slate-800">
								Quick Build: {diagram.title}
							</h1>
							<p className="text-sm text-slate-600 mt-1">
								Add nodes and relationships for this diagram without switching
								pages.
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Link
								to="/diagram"
								className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-300 transition"
							>
								Back to List
							</Link>
							<Link
								to={`/diagram/${slug}`}
								className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 transition"
							>
								Open Diagram View
							</Link>
						</div>
					</div>
					{(message || error) && (
						<div
							className={`mt-4 rounded-md border px-4 py-2 text-sm ${
								error
									? "border-red-200 bg-red-50 text-red-700"
									: "border-green-200 bg-green-50 text-green-700"
							}`}
						>
							{error || message}
						</div>
					)}
				</div>

				<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
					<h2 className="text-lg font-semibold text-slate-800">
						Quick Create Entity + Node
					</h2>
					<p className="text-sm text-slate-600 mt-2">
						Create a new entity and automatically add it to this diagram as a
						node.
					</p>
					<form
						key={entityAndNodeFormKey}
						className="mt-4 space-y-4"
						onSubmit={handleCreateEntityAndNode}
					>
						<LabeledTextField
							id="entityTitle"
							label="Entity Name"
							placeholder="Enter entity name"
						/>
						<button
							type="submit"
							className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition"
						>
							Create Entity + Node
						</button>
					</form>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-white flex flex-col rounded-xl border border-slate-200 shadow-sm p-5">
						<h2 className=" flex text-lg font-semibold text-slate-800">
							Add Node
						</h2>
						{Object.values(entities).length === 0 ? (
							<p className="text-sm text-slate-600 mt-3">
								No entities found yet. Create one in the Entities page first.
							</p>
						) : (
							<form
								key={nodeFormKey}
								className="mt-4 space-y-4 justify-between flex flex-col h-full"
								onSubmit={handleAddNode}
							>
								<LabeledSelectField
									id="entitySlug"
									label="Entity"
									defaultValue=""
								>
									<option value="">Select entity</option>
									{Object.values(entities).map((entity) => (
										<option key={entity.slug} value={entity.slug}>
											{entity.title}
										</option>
									))}
								</LabeledSelectField>
								<button
									type="submit"
									className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition"
								>
									Add Node
								</button>
							</form>
						)}
					</div>

					<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
						<h2 className="text-lg font-semibold text-slate-800">
							Add Relationship
						</h2>
						{diagramNodes.length < 2 ? (
							<p className="text-sm text-slate-600 mt-3">
								Add at least two nodes before creating relationships.
							</p>
						) : (
							<form
								key={relationshipFormKey}
								className="mt-4 space-y-4"
								onSubmit={handleAddRelationship}
							>
								<LabeledSelectField
									id="sourceNodeSlug"
									label="Source Node"
									value={selectedSourceNodeSlug}
									onChange={(event) =>
										setSelectedSourceNodeSlug(event.target.value)
									}
								>
									<option value="">Select source node</option>
									{diagramNodes.map((node) => (
										<option key={node.slug} value={node.slug}>
											{entities[node.entitySlug]?.title || node.slug}
										</option>
									))}
								</LabeledSelectField>
								<LabeledSelectField
									id="targetNodeSlug"
									label="Target Node"
									defaultValue=""
								>
									<option value="">Select target node</option>
									{diagramNodes
										.filter((node) => node.slug !== selectedSourceNodeSlug)
										.map((node) => (
											<option key={node.slug} value={node.slug}>
												{entities[node.entitySlug]?.title || node.slug}
											</option>
										))}
								</LabeledSelectField>
								<button
									type="submit"
									className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
								>
									Add Relationship
								</button>
							</form>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
						<h3 className="text-base font-semibold text-slate-800 mb-3">
							Nodes in This Diagram ({diagramNodes.length})
						</h3>
						<ul className="space-y-2 text-sm text-slate-700">
							{diagramNodes.length > 0 ? (
								diagramNodes.map((node) => (
									<li
										key={node.slug}
										className="rounded-md border flex justify-between border-slate-200 px-3 py-2"
									>
										{entities[node.entitySlug]?.title || node.entitySlug}
										<button
											type="button"
											className=" size-4 text-red-500 hover:text-red-700 text-sm"
											onClick={() => removeNode(node.slug)}
										>
											<CloseIcon />
										</button>
									</li>
								))
							) : (
								<li className="text-slate-500">No nodes yet.</li>
							)}
						</ul>
					</div>

					<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
						<h3 className="text-base font-semibold text-slate-800 mb-3">
							Relationships in This Diagram ({diagramRelationships.length})
						</h3>
						<ul className="space-y-2 text-sm text-slate-700">
							{diagramRelationships.length > 0 ? (
								diagramRelationships.map((relationship) => (
									<li
										key={relationship.slug}
										className="rounded-md flex justify-between border border-slate-200 px-3 py-2"
									>
										<span>
											{entities[
												nodes[relationship.sourceNodeSlug]?.entitySlug || ""
											]?.title || relationship.sourceNodeSlug}
											{" -> "}
											{entities[
												nodes[relationship.targetNodeSlug]?.entitySlug || ""
											]?.title || relationship.targetNodeSlug}
										</span>
										<button
											type="button"
											className=" size-4 text-red-500 hover:text-red-700 text-sm"
											onClick={() => removeRelationship(relationship.slug)}
										>
											<CloseIcon />
										</button>
									</li>
								))
							) : (
								<li className="text-slate-500">No relationships yet.</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DiagramQuickBuildDisplay;
