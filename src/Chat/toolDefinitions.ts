// Tool definitions for function calling
// These define what the AI agent can do with your data

export const toolDefinitions = [
	{
		name: "listEntities",
		description:
			"Get a list of all entities in the system. Returns slug, title, and description for each entity.",
		parameters: {
			type: "object" as const,
			properties: {},
		},
	},
	{
		name: "getEntity",
		description:
			"Get detailed information about a specific entity by its slug.",
		parameters: {
			type: "object" as const,
			properties: {
				slug: {
					type: "string",
					description: "The unique slug identifier of the entity",
				},
			},
			required: ["slug"],
		},
	},
	{
		name: "listDiagrams",
		description:
			"Get a list of all diagrams in the system. Returns slug, title, and description for each diagram.",
		parameters: {
			type: "object" as const,
			properties: {},
		},
	},
	{
		name: "getDiagram",
		description:
			"Get detailed information about a specific diagram by its slug, including its nodes and relationships.",
		parameters: {
			type: "object" as const,
			properties: {
				slug: {
					type: "string",
					description: "The unique slug identifier of the diagram",
				},
			},
			required: ["slug"],
		},
	},
	{
		name: "listNodes",
		description:
			"Get all nodes in a specific diagram. Nodes represent entity instances in a diagram.",
		parameters: {
			type: "object" as const,
			properties: {
				diagramSlug: {
					type: "string",
					description: "The slug of the diagram to get nodes from",
				},
			},
			required: ["diagramSlug"],
		},
	},
	{
		name: "listRelationships",
		description:
			"Get all relationships in a specific diagram. Relationships connect nodes together.",
		parameters: {
			type: "object" as const,
			properties: {
				diagramSlug: {
					type: "string",
					description: "The slug of the diagram to get relationships from",
				},
			},
			required: ["diagramSlug"],
		},
	},
	{
		name: "getSystemOverview",
		description:
			"Get a complete overview of the entire system including counts of entities, diagrams, nodes, and relationships.",
		parameters: {
			type: "object" as const,
			properties: {},
		},
	},
	{
		name: "searchByTitle",
		description:
			"Search for entities or diagrams by title. Returns matching items.",
		parameters: {
			type: "object" as const,
			properties: {
				query: {
					type: "string",
					description: "The search term to match against titles",
				},
			},
			required: ["query"],
		},
	},
];
