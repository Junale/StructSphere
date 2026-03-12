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
	{
		name: "createEntity",
		description:
			"Create a new entity with a title and description. A unique slug will be generated automatically.",
		parameters: {
			type: "object" as const,
			properties: {
				title: {
					type: "string",
					description: "The title/name of the entity",
				},
				description: {
					type: "string",
					description: "A description of what this entity represents",
				},
			},
			required: ["title", "description"],
		},
	},
	{
		name: "updateEntity",
		description:
			"Update an existing entity's title and/or description by its slug.",
		parameters: {
			type: "object" as const,
			properties: {
				slug: {
					type: "string",
					description: "The unique slug identifier of the entity to update",
				},
				title: {
					type: "string",
					description: "The new title for the entity (optional)",
				},
				description: {
					type: "string",
					description: "The new description for the entity (optional)",
				},
			},
			required: ["slug"],
		},
	},
	{
		name: "createDiagram",
		description:
			"Create a new diagram with a title and description. A unique slug will be generated automatically.",
		parameters: {
			type: "object" as const,
			properties: {
				title: {
					type: "string",
					description: "The title/name of the diagram",
				},
				description: {
					type: "string",
					description: "A description of what this diagram shows",
				},
			},
			required: ["title", "description"],
		},
	},
	{
		name: "updateDiagram",
		description:
			"Update an existing diagram's title and/or description by its slug.",
		parameters: {
			type: "object" as const,
			properties: {
				slug: {
					type: "string",
					description: "The unique slug identifier of the diagram to update",
				},
				title: {
					type: "string",
					description: "The new title for the diagram (optional)",
				},
				description: {
					type: "string",
					description: "The new description for the diagram (optional)",
				},
			},
			required: ["slug"],
		},
	},
	{
		name: "createNode",
		description:
			"Create a new node in a diagram. Nodes represent instances of entities within diagrams.",
		parameters: {
			type: "object" as const,
			properties: {
				diagramSlug: {
					type: "string",
					description: "The slug of the diagram to add this node to",
				},
				entitySlug: {
					type: "string",
					description: "The slug of the entity this node represents",
				},
				subDiagramSlug: {
					type: "string",
					description:
						"Optional slug of a sub-diagram this node links to (for hierarchical diagrams)",
				},
			},
			required: ["diagramSlug", "entitySlug"],
		},
	},
	{
		name: "updateNode",
		description:
			"Update an existing node's entity or sub-diagram reference by its slug.",
		parameters: {
			type: "object" as const,
			properties: {
				slug: {
					type: "string",
					description: "The unique slug identifier of the node to update",
				},
				entitySlug: {
					type: "string",
					description: "The new entity slug for the node (optional)",
				},
				subDiagramSlug: {
					type: "string",
					description: "The new sub-diagram slug for the node (optional)",
				},
			},
			required: ["slug"],
		},
	},
	{
		name: "createRelationship",
		description:
			"Create a new relationship between two nodes in a diagram. Relationships define connections between entities.",
		parameters: {
			type: "object" as const,
			properties: {
				diagramSlug: {
					type: "string",
					description: "The slug of the diagram containing these nodes",
				},
				sourceNodeSlug: {
					type: "string",
					description: "The slug of the source/from node",
				},
				targetNodeSlug: {
					type: "string",
					description: "The slug of the target/to node",
				},
				description: {
					type: "string",
					description: "Optional description of the relationship",
				},
			},
			required: ["diagramSlug", "sourceNodeSlug", "targetNodeSlug"],
		},
	},
	{
		name: "updateRelationship",
		description:
			"Update an existing relationship's description or connected nodes by its slug.",
		parameters: {
			type: "object" as const,
			properties: {
				slug: {
					type: "string",
					description:
						"The unique slug identifier of the relationship to update",
				},
				sourceNodeSlug: {
					type: "string",
					description: "The new source node slug (optional)",
				},
				targetNodeSlug: {
					type: "string",
					description: "The new target node slug (optional)",
				},
				description: {
					type: "string",
					description: "The new description for the relationship (optional)",
				},
			},
			required: ["slug"],
		},
	},
];
