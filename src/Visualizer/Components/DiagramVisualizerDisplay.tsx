import { toPng } from "html-to-image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDiagrams } from "@/Diagram/DiagramsContext";
import { useNodes } from "@/Node/NodesContext";
import { useRelationships } from "@/Relationship/RelationshipsContext";
import { useSettings } from "@/Settings/SettingsContext";
import CheckmarkIcon from "@/Shared/Components/Icons/CheckmarkIcon";
import ExportIcon from "@/Shared/Components/Icons/ExportIcon";
import LoadingSpinnerIcon from "@/Shared/Components/Icons/LoadingSpinnerIcon";
import WarningIcon from "@/Shared/Components/Icons/WarningIcon";
import type { TConversionStatus } from "@/Visualizer/ConverterTypes";
import { layoutDiagram } from "@/Visualizer/layoutEngine";
import NodeVisualizerDisplay from "./NodeVisualizerDisplay";
import RelationshipVisualizerDisplay from "./RelationshipVisualizerDisplay";

const DiagramVisualizerDisplay = () => {
	const { slug } = useParams();
	const { diagrams } = useDiagrams();
	const { nodes } = useNodes();
	const { relationships } = useRelationships();
	const { settings } = useSettings();
	const [conversionStatus, setConversionStatus] =
		useState<TConversionStatus>("idle");
	const ref = useRef<HTMLDivElement>(null);
	const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

	const diagramNodes = Object.values(nodes).filter(
		(n) => n.diagramSlug === slug,
	);

	const diagramRelationships = Object.values(relationships).filter(
		(r) => r.diagramSlug === slug,
	);

	useEffect(() => {
		if (!slug) return;
		if (ref.current) {
			setDimensions({
				width: ref.current.clientWidth,
				height: ref.current.clientHeight,
			});
		}
	}, [slug]);

	const layout = useMemo(
		() =>
			layoutDiagram(diagramNodes, diagramRelationships, {
				width: dimensions.width,
				height: dimensions.height,
				...settings.layout,
			}),
		[diagramNodes, diagramRelationships, dimensions, settings],
	);

	const handleConvertToPNG = async () => {
		if (!ref.current || !slug) return;

		setConversionStatus("converting");

		try {
			// Use html-to-image to convert the diagram to PNG
			const dataUrl = await toPng(ref.current, {
				cacheBust: true,
				backgroundColor: "#ffffff",
			});

			const link = document.createElement("a");
			link.download = `${diagrams[slug].title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.png`;
			link.href = dataUrl;
			link.click();

			setConversionStatus("success");
			setTimeout(() => setConversionStatus("idle"), 2000);
		} catch (error) {
			console.error("Error converting to PNG:", error);
			setConversionStatus("error");
			setTimeout(() => setConversionStatus("idle"), 3000);
		}
	};

	if (!slug) return <div>Diagram slug is required.</div>;

	const diagram = diagrams[slug];
	if (!diagram) return <div>Diagram not found.</div>;

	return (
		<div className="flex flex-col size-full">
			{/* View Info Header */}
			<div className="flex flex-col w-full h-fit p-4 border rounded-lg shadow-md items-center justify-center relative">
				<h1 className="text-2xl font-bold mb-2">{diagram.title}</h1>
				<span>{diagram.description}</span>
				<div className="flex flex-col h-full justify-center items-center absolute top-0 right-0 p-2">
					<button
						type="button"
						onClick={handleConvertToPNG}
						disabled={!slug || conversionStatus === "converting"}
						className="px-6 py-3 flex gap-2 text-blue-600 font-semibold rounded-lg hover:text-blue-700 hover:cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
					>
						{conversionStatus === "converting" && (
							<>
								<div className="size-6">
									<LoadingSpinnerIcon />
								</div>
								<p>Converting...</p>
							</>
						)}
						{conversionStatus === "success" && (
							<>
								<div className="size-6">
									<CheckmarkIcon />
								</div>
								<p>Downloaded</p>
							</>
						)}
						{conversionStatus === "error" && (
							<>
								<div className="size-6">
									<WarningIcon />
								</div>
								<p>Error occurred</p>
							</>
						)}
						{conversionStatus === "idle" && (
							<>
								<div className="size-6">
									<ExportIcon />
								</div>
								<p>Export as PNG</p>
							</>
						)}
					</button>
				</div>
			</div>

			{/* View Content Visualization */}
			<div
				ref={ref}
				key={slug}
				className="flex flex-1 size-full p-4 border rounded-lg shadow-md bg-white relative overflow-auto"
			>
				{diagramNodes.map(
					(node) =>
						layout.nodes[node.slug] && (
							<NodeVisualizerDisplay
								key={node.slug}
								node={node}
								layoutNode={layout.nodes[node.slug]}
							/>
						),
				)}
				{diagramRelationships.map((relationship) => {
					const edgeKey = `${relationship.sourceNodeSlug}-${relationship.targetNodeSlug}`;
					const labelOffset = layout.edgeLabelOffsets[edgeKey] || {
						dx: 0,
						dy: 0,
					};
					return (
						<RelationshipVisualizerDisplay
							key={edgeKey}
							relationshipSlug={relationship.slug}
							source={nodes[relationship.sourceNodeSlug]}
							target={nodes[relationship.targetNodeSlug]}
							layoutNodes={layout.nodes}
							description={relationship.description || ""}
							labelOffset={labelOffset}
							arrowSize={settings.layout.arrowSize}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DiagramVisualizerDisplay;
