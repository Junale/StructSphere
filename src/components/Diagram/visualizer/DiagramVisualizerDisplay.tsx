import type { TComponent, TDiagram } from "@/types";
import { getSlug } from "@/utils";
import { useParams } from "react-router-dom";
import EntityVisualizerDisplay from "./EntityVisualizerDisplay";
import RelationshipVisualizerDisplay from "./RelationshipVisualizerDisplay";

const DiagramVisualizerDisplay = () => {
	const { slug } = useParams();

	const components: Record<string, TComponent> = {
		"component-1": {
			slug: "component-1",
			title: "Component 1",
			description: "This is component 1",
		},
		"component-2": {
			slug: "component-2",
			title: "Component 2",
			description: "This is component 2",
		},
	};
	const diagramComponents = Object.values(components).filter((component) =>
		Object.keys(diagram.componentMetaData).includes(component.slug),
	);

	const diagram: TDiagram = {
		slug: getSlug(),
		title: "Test diagram",
		description: "This is a test diagram",
		componentMetaData: {
			[components[Object.keys(components)[0]].slug]: {
				size: { width: 150, height: 100 },
				color: "#f0f0f0",
				position: { x: 100, y: 100 },
			},
		},
		relationships: {},
		subDiagrams: {},
	};

	return (
		<div className="flex flex-col size-full">
			{/* View Info Header */}
			<div className="flex flex-col w-full h-fit p-4 border rounded-lg shadow-md items-center justify-center">
				<h1 className="text-2xl font-bold mb-2">{diagram.title}</h1>
				<span>{diagram.description}</span>
			</div>

			{/* View Content Visualization */}
			<div className="flex flex-1 size-full p-4 border rounded-lg shadow-md bg-white relative overflow-auto">
				{diagramComponents.map((component) => (
					<EntityVisualizerDisplay
						key={component.slug}
						entity={component}
						metaData={diagram.componentMetaData[component.slug]}
					/>
				))}
				{Object.entries(diagram.relationships).map(
					([componentSlug, componentRelationships]) =>
						componentRelationships.map((relationship) => {
							return (
								<RelationshipVisualizerDisplay
									key={`${componentSlug}_${relationship.relatedComponentSlug}`}
									relationType={relationship.type}
									component={components[componentSlug]}
									relatedComponent={
										components[relationship.relatedComponentSlug]
									}
									metaData={diagram.componentMetaData}
								/>
							);
						}),
				)}
			</div>
		</div>
	);
};

export default DiagramVisualizerDisplay;
