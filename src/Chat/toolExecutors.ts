// Tool execution functions
// These functions are called when the AI agent requests a tool

import { getSlug } from "@/Shared/SharedUtil";

type TSlug = string;

interface TEntity {
	slug: TSlug;
	title: string;
	description: string;
}

interface TDiagram {
	slug: TSlug;
	title: string;
	description: string;
}

interface TNode {
	slug: TSlug;
	entitySlug: TSlug;
	diagramSlug: TSlug;
	subDiagramSlug?: TSlug;
}

interface TRelationship {
	slug: TSlug;
	diagramSlug: TSlug;
	sourceNodeSlug: TSlug;
	targetNodeSlug: TSlug;
	description?: string;
}

// Helper to get data from localStorage
const getFromStorage = <T>(key: string): Record<string, T> => {
	try {
		const stored = localStorage.getItem(key);
		return stored ? JSON.parse(stored) : {};
	} catch {
		return {};
	}
};

// Helper to save data to localStorage
const saveToStorage = <T>(key: string, data: Record<string, T>): void => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
		// Dispatch storage event to notify other components
		window.dispatchEvent(new Event("storage"));
	} catch (error) {
		console.error(`Failed to save to localStorage: ${error}`);
	}
};

export const toolExecutors: Record<
	string,
	(args: Record<string, unknown>) => unknown
> = {
	listEntities: () => {
		const entities = getFromStorage<TEntity>("structsphere-entities");
		return Object.values(entities).map((e) => ({
			slug: e.slug,
			title: e.title,
			description: e.description,
		}));
	},

	getEntity: (args) => {
		const entities = getFromStorage<TEntity>("structsphere-entities");
		const entity = entities[args.slug as string];
		if (!entity) {
			return { error: `Entity with slug '${args.slug}' not found` };
		}
		return entity;
	},

	listDiagrams: () => {
		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");
		return Object.values(diagrams).map((d) => ({
			slug: d.slug,
			title: d.title,
			description: d.description,
		}));
	},

	getDiagram: (args) => {
		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");
		const diagram = diagrams[args.slug as string];
		if (!diagram) {
			return { error: `Diagram with slug '${args.slug}' not found` };
		}

		const nodes = getFromStorage<TNode>("structsphere-nodes");
		const relationships = getFromStorage<TRelationship>(
			"structsphere-relationships",
		);

		const diagramNodes = Object.values(nodes).filter(
			(n) => n.diagramSlug === args.slug,
		);
		const diagramRelationships = Object.values(relationships).filter(
			(r) => r.diagramSlug === args.slug,
		);

		return {
			...diagram,
			nodes: diagramNodes,
			relationships: diagramRelationships,
		};
	},

	listNodes: (args) => {
		const nodes = getFromStorage<TNode>("structsphere-nodes");
		return Object.values(nodes).filter(
			(n) => n.diagramSlug === args.diagramSlug,
		);
	},

	listRelationships: (args) => {
		const relationships = getFromStorage<TRelationship>(
			"structsphere-relationships",
		);
		return Object.values(relationships).filter(
			(r) => r.diagramSlug === args.diagramSlug,
		);
	},

	getSystemOverview: () => {
		const entities = getFromStorage<TEntity>("structsphere-entities");
		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");
		const nodes = getFromStorage<TNode>("structsphere-nodes");
		const relationships = getFromStorage<TRelationship>(
			"structsphere-relationships",
		);

		return {
			totalEntities: Object.keys(entities).length,
			totalDiagrams: Object.keys(diagrams).length,
			totalNodes: Object.keys(nodes).length,
			totalRelationships: Object.keys(relationships).length,
			entities: Object.values(entities).map((e) => e.title),
			diagrams: Object.values(diagrams).map((d) => d.title),
		};
	},

	searchByTitle: (args) => {
		const query = (args.query as string).toLowerCase();
		const entities = getFromStorage<TEntity>("structsphere-entities");
		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");

		const matchingEntities = Object.values(entities).filter((e) =>
			e.title.toLowerCase().includes(query),
		);
		const matchingDiagrams = Object.values(diagrams).filter((d) =>
			d.title.toLowerCase().includes(query),
		);

		return {
			entities: matchingEntities,
			diagrams: matchingDiagrams,
		};
	},

	// CREATE OPERATIONS

	createEntity: (args) => {
		const slug = getSlug();
		const title = args.title as string;
		const description = args.description as string;

		const entities = getFromStorage<TEntity>("structsphere-entities");
		const newEntity: TEntity = { slug, title, description };
		entities[slug] = newEntity;
		saveToStorage("structsphere-entities", entities);

		return {
			success: true,
			message: `Entity '${title}' created successfully`,
			entity: newEntity,
		};
	},

	createDiagram: (args) => {
		const slug = getSlug();
		const title = args.title as string;
		const description = args.description as string;

		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");
		const newDiagram: TDiagram = { slug, title, description };
		diagrams[slug] = newDiagram;
		saveToStorage("structsphere-diagrams", diagrams);

		return {
			success: true,
			message: `Diagram '${title}' created successfully`,
			diagram: newDiagram,
		};
	},

	createNode: (args) => {
		const slug = getSlug();
		const diagramSlug = args.diagramSlug as string;
		const entitySlug = args.entitySlug as string;
		const subDiagramSlug = args.subDiagramSlug as string | undefined;

		// Validate that the diagram and entity exist
		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");
		const entities = getFromStorage<TEntity>("structsphere-entities");

		if (!diagrams[diagramSlug]) {
			return {
				success: false,
				error: `Diagram with slug '${diagramSlug}' not found`,
			};
		}

		if (!entities[entitySlug]) {
			return {
				success: false,
				error: `Entity with slug '${entitySlug}' not found`,
			};
		}

		const nodes = getFromStorage<TNode>("structsphere-nodes");
		const newNode: TNode = {
			slug,
			diagramSlug,
			entitySlug,
			...(subDiagramSlug && { subDiagramSlug }),
		};
		nodes[slug] = newNode;
		saveToStorage("structsphere-nodes", nodes);

		return {
			success: true,
			message: `Node created successfully in diagram '${diagrams[diagramSlug].title}'`,
			node: newNode,
		};
	},

	createRelationship: (args) => {
		const slug = getSlug();
		const diagramSlug = args.diagramSlug as string;
		const sourceNodeSlug = args.sourceNodeSlug as string;
		const targetNodeSlug = args.targetNodeSlug as string;
		const description = args.description as string | undefined;

		// Validate that the diagram and nodes exist
		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");
		const nodes = getFromStorage<TNode>("structsphere-nodes");

		if (!diagrams[diagramSlug]) {
			return {
				success: false,
				error: `Diagram with slug '${diagramSlug}' not found`,
			};
		}

		if (!nodes[sourceNodeSlug]) {
			return {
				success: false,
				error: `Source node with slug '${sourceNodeSlug}' not found`,
			};
		}

		if (!nodes[targetNodeSlug]) {
			return {
				success: false,
				error: `Target node with slug '${targetNodeSlug}' not found`,
			};
		}

		const relationships = getFromStorage<TRelationship>(
			"structsphere-relationships",
		);
		const newRelationship: TRelationship = {
			slug,
			diagramSlug,
			sourceNodeSlug,
			targetNodeSlug,
			...(description && { description }),
		};
		relationships[slug] = newRelationship;
		saveToStorage("structsphere-relationships", relationships);

		return {
			success: true,
			message: `Relationship created successfully in diagram '${diagrams[diagramSlug].title}'`,
			relationship: newRelationship,
		};
	},

	// UPDATE OPERATIONS

	updateEntity: (args) => {
		const slug = args.slug as string;
		const entities = getFromStorage<TEntity>("structsphere-entities");

		if (!entities[slug]) {
			return {
				success: false,
				error: `Entity with slug '${slug}' not found`,
			};
		}

		const updatedEntity = { ...entities[slug] };
		if (args.title) updatedEntity.title = args.title as string;
		if (args.description)
			updatedEntity.description = args.description as string;

		entities[slug] = updatedEntity;
		saveToStorage("structsphere-entities", entities);

		return {
			success: true,
			message: `Entity '${updatedEntity.title}' updated successfully`,
			entity: updatedEntity,
		};
	},

	updateDiagram: (args) => {
		const slug = args.slug as string;
		const diagrams = getFromStorage<TDiagram>("structsphere-diagrams");

		if (!diagrams[slug]) {
			return {
				success: false,
				error: `Diagram with slug '${slug}' not found`,
			};
		}

		const updatedDiagram = { ...diagrams[slug] };
		if (args.title) updatedDiagram.title = args.title as string;
		if (args.description)
			updatedDiagram.description = args.description as string;

		diagrams[slug] = updatedDiagram;
		saveToStorage("structsphere-diagrams", diagrams);

		return {
			success: true,
			message: `Diagram '${updatedDiagram.title}' updated successfully`,
			diagram: updatedDiagram,
		};
	},

	updateNode: (args) => {
		const slug = args.slug as string;
		const nodes = getFromStorage<TNode>("structsphere-nodes");

		if (!nodes[slug]) {
			return {
				success: false,
				error: `Node with slug '${slug}' not found`,
			};
		}

		// Validate entity if being updated
		if (args.entitySlug) {
			const entities = getFromStorage<TEntity>("structsphere-entities");
			if (!entities[args.entitySlug as string]) {
				return {
					success: false,
					error: `Entity with slug '${args.entitySlug}' not found`,
				};
			}
		}

		const updatedNode = { ...nodes[slug] };
		if (args.entitySlug) updatedNode.entitySlug = args.entitySlug as string;
		if (args.subDiagramSlug)
			updatedNode.subDiagramSlug = args.subDiagramSlug as string;

		nodes[slug] = updatedNode;
		saveToStorage("structsphere-nodes", nodes);

		return {
			success: true,
			message: "Node updated successfully",
			node: updatedNode,
		};
	},

	updateRelationship: (args) => {
		const slug = args.slug as string;
		const relationships = getFromStorage<TRelationship>(
			"structsphere-relationships",
		);

		if (!relationships[slug]) {
			return {
				success: false,
				error: `Relationship with slug '${slug}' not found`,
			};
		}

		// Validate nodes if being updated
		if (args.sourceNodeSlug || args.targetNodeSlug) {
			const nodes = getFromStorage<TNode>("structsphere-nodes");

			if (args.sourceNodeSlug && !nodes[args.sourceNodeSlug as string]) {
				return {
					success: false,
					error: `Source node with slug '${args.sourceNodeSlug}' not found`,
				};
			}

			if (args.targetNodeSlug && !nodes[args.targetNodeSlug as string]) {
				return {
					success: false,
					error: `Target node with slug '${args.targetNodeSlug}' not found`,
				};
			}
		}

		const updatedRelationship = { ...relationships[slug] };
		if (args.sourceNodeSlug)
			updatedRelationship.sourceNodeSlug = args.sourceNodeSlug as string;
		if (args.targetNodeSlug)
			updatedRelationship.targetNodeSlug = args.targetNodeSlug as string;
		if (args.description)
			updatedRelationship.description = args.description as string;

		relationships[slug] = updatedRelationship;
		saveToStorage("structsphere-relationships", relationships);

		return {
			success: true,
			message: "Relationship updated successfully",
			relationship: updatedRelationship,
		};
	},
};
