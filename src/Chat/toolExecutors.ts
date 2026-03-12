// Tool execution functions
// These functions are called when the AI agent requests a tool

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
	title: string;
	description: string;
}

interface TRelationship {
	slug: TSlug;
	diagramSlug: TSlug;
	fromNodeSlug: TSlug;
	toNodeSlug: TSlug;
	title: string;
	description: string;
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
};
