import type { TNode } from "@/Node/NodeTypes";
import type { TRelationship } from "@/Relationship/RelationshipTypes";
import type { TSlug } from "../Shared/SharedTypes";

export type LayoutOptions = {
	width?: number;
	height?: number;
	iterations?: number;
	repulsion?: number;
	springLength?: number;
	springStrength?: number;
	damping?: number;
	labelCollisionThreshold?: number;
};

export function layoutDiagram(
	nodes: TNode[],
	relationships: TRelationship[],
	options: LayoutOptions = {},
) {
	const width = options.width ?? 1000;
	const height = options.height ?? 800;

	// Build adjacency map
	const childrenMap = new Map<TSlug, TSlug[]>();
	const parentsMap = new Map<TSlug, TSlug[]>();

	for (const node of nodes) {
		childrenMap.set(node.slug, []);
		parentsMap.set(node.slug, []);
	}

	for (const rel of relationships) {
		childrenMap.get(rel.sourceNodeSlug)?.push(rel.targetNodeSlug);
		parentsMap.get(rel.targetNodeSlug)?.push(rel.sourceNodeSlug);
	}

	// Find root nodes (no parents)
	const roots = nodes.filter((n) => parentsMap.get(n.slug)?.length === 0);
	if (roots.length === 0 && nodes.length > 0) {
		// Handle cycles - pick first node as root
		roots.push(nodes[0]);
	}

	// Assign levels (depth from root)
	const levels = new Map<TSlug, number>();
	const visited = new Set<TSlug>();

	function assignLevel(slug: TSlug, level: number) {
		if (visited.has(slug)) return;
		visited.add(slug);
		levels.set(slug, Math.max(levels.get(slug) ?? 0, level));

		for (const child of childrenMap.get(slug) ?? []) {
			assignLevel(child, level + 1);
		}
	}

	for (const root of roots) {
		assignLevel(root.slug, 0);
	}

	// Group nodes by level
	const nodesByLevel = new Map<number, TSlug[]>();
	for (const [slug, level] of levels) {
		if (!nodesByLevel.has(level)) {
			nodesByLevel.set(level, []);
		}
		nodesByLevel.get(level)?.push(slug);
	}

	// Initial ordering by slug (alphabetically) to create a consistent starting point
	for (const [level, slugs] of nodesByLevel) {
		slugs.sort((a, b) => a.localeCompare(b));
		nodesByLevel.set(level, slugs);
	}

	const maxLevel = Math.max(...levels.values());

	// Anti-crossing optimization using weighted median method
	const optimizeCrossings = (iterations = 20) => {
		for (let iter = 0; iter < iterations; iter++) {
			// Top-down pass
			for (let level = 1; level <= maxLevel; level++) {
				const slugs = nodesByLevel.get(level) ?? [];
				if (slugs.length <= 1) continue;

				const priorities: Array<{
					slug: TSlug;
					value: number;
					weight: number;
				}> = [];

				for (const slug of slugs) {
					const parents = parentsMap.get(slug) ?? [];
					const weight = parents.length;

					if (parents.length > 0) {
						const prevLevel = nodesByLevel.get(level - 1) ?? [];
						const parentIndices = parents
							.map((p) => prevLevel.indexOf(p))
							.filter((idx) => idx !== -1)
							.sort((a, b) => a - b);

						if (parentIndices.length > 0) {
							// Use weighted average for better results with multiple connections
							const avg =
								parentIndices.reduce((sum, idx) => sum + idx, 0) /
								parentIndices.length;
							priorities.push({ slug, value: avg, weight });
						} else {
							priorities.push({
								slug,
								value: slugs.indexOf(slug),
								weight: 0,
							});
						}
					} else {
						priorities.push({ slug, value: slugs.indexOf(slug), weight: 0 });
					}
				}

				// Sort by priority value, then by weight (more connections = higher priority), then by slug
				priorities.sort((a, b) => {
					const diff = a.value - b.value;
					if (Math.abs(diff) > 0.5) return diff;
					// If very close in position, prioritize nodes with more connections
					const weightDiff = b.weight - a.weight;
					return weightDiff !== 0 ? weightDiff : a.slug.localeCompare(b.slug);
				});
				nodesByLevel.set(
					level,
					priorities.map((p) => p.slug),
				);
			}

			// Bottom-up pass
			for (let level = maxLevel - 1; level >= 0; level--) {
				const slugs = nodesByLevel.get(level) ?? [];
				if (slugs.length <= 1) continue;

				const priorities: Array<{
					slug: TSlug;
					value: number;
					weight: number;
				}> = [];

				for (const slug of slugs) {
					const children = childrenMap.get(slug) ?? [];
					const weight = children.length;

					if (children.length > 0) {
						const nextLevel = nodesByLevel.get(level + 1) ?? [];
						const childIndices = children
							.map((c) => nextLevel.indexOf(c))
							.filter((idx) => idx !== -1)
							.sort((a, b) => a - b);

						if (childIndices.length > 0) {
							// Use weighted average for better results with multiple connections
							const avg =
								childIndices.reduce((sum, idx) => sum + idx, 0) /
								childIndices.length;
							priorities.push({ slug, value: avg, weight });
						} else {
							priorities.push({
								slug,
								value: slugs.indexOf(slug),
								weight: 0,
							});
						}
					} else {
						priorities.push({ slug, value: slugs.indexOf(slug), weight: 0 });
					}
				}

				// Sort by priority value, then by weight (more connections = higher priority), then by slug
				priorities.sort((a, b) => {
					const diff = a.value - b.value;
					if (Math.abs(diff) > 0.5) return diff;
					// If very close in position, prioritize nodes with more connections
					const weightDiff = b.weight - a.weight;
					return weightDiff !== 0 ? weightDiff : a.slug.localeCompare(b.slug);
				});
				nodesByLevel.set(
					level,
					priorities.map((p) => p.slug),
				);
			}
		}
	};

	optimizeCrossings(20);

	// Node dimensions
	const nodeWidth = 150;
	const nodeHeight = 100;
	const horizontalPadding = 100; // Space between levels
	const verticalPadding = 40; // Space between nodes in same level

	// Calculate required width based on levels
	const minLevelWidth = nodeWidth + horizontalPadding;
	const requiredWidth = (maxLevel + 1) * minLevelWidth;
	const actualWidth = Math.max(width, requiredWidth);
	const levelWidth = actualWidth / (maxLevel + 1);

	// Position nodes
	const positions = new Map<TSlug, { x: number; y: number }>();

	for (const [level, slugs] of nodesByLevel) {
		const x = levelWidth * (level + 0.5); // Left to right

		// Calculate required height for this level
		const nodesHeight = slugs.length * nodeHeight;
		const paddingHeight = (slugs.length - 1) * verticalPadding;
		const totalRequiredHeight = nodesHeight + paddingHeight;
		const actualHeight = Math.max(height, totalRequiredHeight);

		// Center the nodes vertically if there's extra space
		const startY = (actualHeight - totalRequiredHeight) / 2;
		const spacing = nodeHeight + verticalPadding;

		slugs.forEach((slug, index) => {
			const y = startY + spacing * index + nodeHeight / 2;
			positions.set(slug, { x, y });
		});
	}

	// Calculate label positions along edges to avoid collisions
	const edgeLabelOffsets = new Map<string, { dx: number; dy: number }>();
	const labelCollisionThreshold = options.labelCollisionThreshold ?? 80; // Distance threshold for collision detection

	// Calculate info for all edges
	const edgeInfo: Array<{
		key: string;
		sourceX: number;
		sourceY: number;
		targetX: number;
		targetY: number;
		midX: number;
		midY: number;
	}> = [];

	for (const rel of relationships) {
		const sourcePos = positions.get(rel.sourceNodeSlug);
		const targetPos = positions.get(rel.targetNodeSlug);
		if (!sourcePos || !targetPos) continue;

		const key = `${rel.sourceNodeSlug}-${rel.targetNodeSlug}`;
		edgeInfo.push({
			key,
			sourceX: sourcePos.x,
			sourceY: sourcePos.y,
			targetX: targetPos.x,
			targetY: targetPos.y,
			midX: (sourcePos.x + targetPos.x) / 2,
			midY: (sourcePos.y + targetPos.y) / 2,
		});
	}

	// Sort edges by position for consistent ordering
	edgeInfo.sort((a, b) => {
		const xDiff = a.midX - b.midX;
		return xDiff !== 0 ? xDiff : a.midY - b.midY;
	});

	// Track occupied label positions
	const occupiedPositions: Array<{
		x: number;
		y: number;
	}> = [];

	// Assign positions along each edge to avoid collisions
	for (const edge of edgeInfo) {
		const positionsToTry = [0.5, 0.4, 0.6, 0.3, 0.7, 0.25, 0.75, 0.2, 0.8]; // Try different positions along the edge
		let bestPosition = 0.5;
		let bestDistance = 0;

		for (const t of positionsToTry) {
			const x = edge.sourceX + (edge.targetX - edge.sourceX) * t;
			const y = edge.sourceY + (edge.targetY - edge.sourceY) * t;

			// Find minimum distance to any occupied position
			let minDist = Infinity;
			for (const occupied of occupiedPositions) {
				const dist = Math.sqrt((x - occupied.x) ** 2 + (y - occupied.y) ** 2);
				minDist = Math.min(minDist, dist);
			}

			// Use this position if it's better than what we have
			if (minDist > bestDistance) {
				bestDistance = minDist;
				bestPosition = t;
			}

			// If we found a position far enough away, use it
			if (minDist > labelCollisionThreshold) {
				bestPosition = t;
				break;
			}
		}

		// Calculate offset from midpoint
		const finalX = edge.sourceX + (edge.targetX - edge.sourceX) * bestPosition;
		const finalY = edge.sourceY + (edge.targetY - edge.sourceY) * bestPosition;
		const offsetX = finalX - edge.midX;
		const offsetY = finalY - edge.midY;

		edgeLabelOffsets.set(edge.key, { dx: offsetX, dy: offsetY });
		occupiedPositions.push({ x: finalX, y: finalY });
	}

	// Return formatted result with edge label offsets
	return {
		nodes: Object.fromEntries(
			nodes.map((n) => {
				const pos = positions.get(n.slug) ?? {
					x: actualWidth / 2,
					y: height / 2,
				};
				return [
					n.slug,
					{
						slug: n.slug,
						position: pos,
						size: { width: nodeWidth, height: nodeHeight },
					},
				];
			}),
		),
		edgeLabelOffsets: Object.fromEntries(edgeLabelOffsets),
	};
}
