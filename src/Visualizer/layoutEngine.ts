import type { TNode } from "@/Node/NodeTypes";
import type { TRelationship } from "@/Relationship/RelationshipTypes";
import type { TSlug } from "../Shared/SharedTypes";

export type LayoutOptions = {
	width: number;
	height: number;
	nodeWidth: number;
	nodeHeight: number;
	horizontalGap: number;
	verticalGap: number;
	labelCollisionThreshold: number;
};

export function layoutDiagram(
	nodes: TNode[],
	relationships: TRelationship[],
	options: LayoutOptions,
) {
	const {
		width,
		height,
		nodeWidth,
		nodeHeight,
		horizontalGap,
		verticalGap,
		labelCollisionThreshold,
	} = options;

	if (nodes.length === 0) return { nodes: {}, edgeLabelOffsets: {} };

	// Build adjacency maps
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

	// Topological sort (DFS post-order), cycle-safe
	const topoOrder: TSlug[] = [];
	const permVisited = new Set<TSlug>();
	const tempVisited = new Set<TSlug>();
	function topoVisit(slug: TSlug) {
		if (permVisited.has(slug)) return;
		if (tempVisited.has(slug)) return; // back edge — skip cycle
		tempVisited.add(slug);
		for (const child of childrenMap.get(slug) ?? []) topoVisit(child);
		tempVisited.delete(slug);
		permVisited.add(slug);
		topoOrder.unshift(slug);
	}
	for (const node of nodes) topoVisit(node.slug);

	// Longest-path level assignment (pushes nodes as deep as possible)
	const levels = new Map<TSlug, number>();
	for (const slug of topoOrder) levels.set(slug, 0);
	for (const slug of topoOrder) {
		const level = levels.get(slug) ?? 0;
		for (const child of childrenMap.get(slug) ?? []) {
			levels.set(child, Math.max(levels.get(child) ?? 0, level + 1));
		}
	}

	// Group nodes by level, sorted alphabetically for deterministic output
	const nodesByLevel = new Map<number, TSlug[]>();
	for (const [slug, level] of levels) {
		if (!nodesByLevel.has(level)) nodesByLevel.set(level, []);
		nodesByLevel.get(level)?.push(slug);
	}
	for (const slugs of nodesByLevel.values()) {
		slugs.sort((a, b) => a.localeCompare(b));
	}

	const maxLevel = Math.max(...levels.values(), 0);

	// Crossing reduction: weighted median heuristic, 24 bi-directional passes
	const median = (indices: number[]) => {
		if (indices.length === 0) return -1;
		const s = [...indices].sort((a, b) => a - b);
		const m = Math.floor(s.length / 2);
		return s.length % 2 === 1 ? s[m] : (s[m - 1] + s[m]) / 2;
	};

	for (let iter = 0; iter < 24; iter++) {
		// Top-down pass
		for (let level = 1; level <= maxLevel; level++) {
			const slugs = nodesByLevel.get(level) ?? [];
			const prev = nodesByLevel.get(level - 1) ?? [];
			slugs.sort((a, b) => {
				const ai = median(
					(parentsMap.get(a) ?? [])
						.map((p) => prev.indexOf(p))
						.filter((i) => i !== -1),
				);
				const bi = median(
					(parentsMap.get(b) ?? [])
						.map((p) => prev.indexOf(p))
						.filter((i) => i !== -1),
				);
				return ai !== bi ? ai - bi : a.localeCompare(b);
			});
		}
		// Bottom-up pass
		for (let level = maxLevel - 1; level >= 0; level--) {
			const slugs = nodesByLevel.get(level) ?? [];
			const next = nodesByLevel.get(level + 1) ?? [];
			slugs.sort((a, b) => {
				const ai = median(
					(childrenMap.get(a) ?? [])
						.map((c) => next.indexOf(c))
						.filter((i) => i !== -1),
				);
				const bi = median(
					(childrenMap.get(b) ?? [])
						.map((c) => next.indexOf(c))
						.filter((i) => i !== -1),
				);
				return ai !== bi ? ai - bi : a.localeCompare(b);
			});
		}
	}

	// Compute canvas width: enough to fit all levels with gaps
	const levelCount = maxLevel + 1;
	const levelSpan = nodeWidth + horizontalGap;
	const actualWidth = Math.max(width, levelCount * levelSpan + horizontalGap);
	const columnWidth = actualWidth / levelCount;

	// Position nodes as top-left corners, centered within their column and level group
	const positions = new Map<TSlug, { x: number; y: number }>();
	for (const [level, slugs] of nodesByLevel) {
		// Center node horizontally within its column
		const x = columnWidth * level + (columnWidth - nodeWidth) / 2;

		// Center the level group vertically within the canvas
		const groupHeight =
			slugs.length * nodeHeight + (slugs.length - 1) * verticalGap;
		const actualHeight = Math.max(height, groupHeight + verticalGap * 2);
		const startY = (actualHeight - groupHeight) / 2;

		slugs.forEach((slug, i) => {
			positions.set(slug, { x, y: startY + i * (nodeHeight + verticalGap) });
		});
	}

	// Edge label collision avoidance along each edge
	// Offsets are relative to the center of the edge (between the two node centers)
	const nodeCenter = (slug: TSlug) => {
		const pos = positions.get(slug);
		if (!pos) return null;
		return { x: pos.x + nodeWidth / 2, y: pos.y + nodeHeight / 2 };
	};

	const edgeLabelOffsets = new Map<string, { dx: number; dy: number }>();
	const occupied: { x: number; y: number }[] = [];

	const edges = relationships
		.map((rel) => {
			const src = nodeCenter(rel.sourceNodeSlug);
			const tgt = nodeCenter(rel.targetNodeSlug);
			if (!src || !tgt) return null;
			return {
				key: `${rel.sourceNodeSlug}-${rel.targetNodeSlug}`,
				sx: src.x,
				sy: src.y,
				tx: tgt.x,
				ty: tgt.y,
				mx: (src.x + tgt.x) / 2,
				my: (src.y + tgt.y) / 2,
			};
		})
		.filter(Boolean) as Array<{
		key: string;
		sx: number;
		sy: number;
		tx: number;
		ty: number;
		mx: number;
		my: number;
	}>;

	edges.sort((a, b) => a.mx - b.mx || a.my - b.my);

	for (const edge of edges) {
		let bestT = 0.5;
		let bestDist = -1;
		for (const t of [0.5, 0.4, 0.6, 0.3, 0.7, 0.25, 0.75]) {
			const cx = edge.sx + (edge.tx - edge.sx) * t;
			const cy = edge.sy + (edge.ty - edge.sy) * t;
			const minDist = occupied.reduce(
				(min, o) => Math.min(min, Math.hypot(cx - o.x, cy - o.y)),
				Infinity,
			);
			if (minDist > bestDist) {
				bestDist = minDist;
				bestT = t;
			}
			if (minDist >= labelCollisionThreshold) break;
		}
		const fx = edge.sx + (edge.tx - edge.sx) * bestT;
		const fy = edge.sy + (edge.ty - edge.sy) * bestT;
		edgeLabelOffsets.set(edge.key, { dx: fx - edge.mx, dy: fy - edge.my });
		occupied.push({ x: fx, y: fy });
	}

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
