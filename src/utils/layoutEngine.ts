import type { TDiagram } from "../types/diagram";
import type { TSlug } from "../types/shared";

type LayoutOptions = {
	width?: number;
	height?: number;
	iterations?: number;
	repulsion?: number;
	springLength?: number;
	springStrength?: number;
	damping?: number;
};

type SimNode = {
	slug: TSlug;
	x: number;
	y: number;
	vx: number;
	vy: number;
};

function centerNodes(nodes: SimNode[], width: number, height: number) {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;

	for (const n of nodes) {
		if (n.x < minX) minX = n.x;
		if (n.y < minY) minY = n.y;
		if (n.x > maxX) maxX = n.x;
		if (n.y > maxY) maxY = n.y;
	}

	const diagramWidth = maxX - minX;
	const diagramHeight = maxY - minY;

	const offsetX = width / 2 - (minX + diagramWidth / 2);
	const offsetY = height / 2 - (minY + diagramHeight / 2);

	for (const n of nodes) {
		n.x += offsetX;
		n.y += offsetY;
	}
}

// Simple hash function for deterministic positioning
function hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

// Seeded random number generator for deterministic layout
function seededRandom(seed: number): number {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

export function layoutDiagram(diagram: TDiagram, options: LayoutOptions = {}) {
	const width = options.width ?? 1000;
	const height = options.height ?? 800;
	const iterations = options.iterations ?? 500;

	const repulsion = options.repulsion ?? 4000;
	const springLength = options.springLength ?? 120;
	const springStrength = options.springStrength ?? 0.05;
	const damping = options.damping ?? 0.85;

	const simNodes: SimNode[] = diagram.nodes.map((n) => {
		const seed = hashString(n.slug);
		return {
			slug: n.slug,
			x: seededRandom(seed) * width,
			y: seededRandom(seed + 1) * height,
			vx: 0,
			vy: 0,
		};
	});

	const nodeMap = new Map(simNodes.map((n) => [n.slug, n]));

	for (let i = 0; i < iterations; i++) {
		// repulsion
		for (let a = 0; a < simNodes.length; a++) {
			for (let b = a + 1; b < simNodes.length; b++) {
				const n1 = simNodes[a];
				const n2 = simNodes[b];

				const dx = n2.x - n1.x;
				const dy = n2.y - n1.y;

				let distSq = dx * dx + dy * dy;
				if (distSq === 0) distSq = 0.01;

				const force = repulsion / distSq;

				const dist = Math.sqrt(distSq);

				const fx = (force * dx) / dist;
				const fy = (force * dy) / dist;

				n1.vx -= fx;
				n1.vy -= fy;

				n2.vx += fx;
				n2.vy += fy;
			}
		}

		// spring forces
		for (const rel of diagram.relationships) {
			const source = nodeMap.get(rel.source);
			const target = nodeMap.get(rel.target);

			if (!source || !target) continue;

			const dx = target.x - source.x;
			const dy = target.y - source.y;

			const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;

			const displacement = dist - springLength;

			const force = springStrength * displacement;

			const fx = (force * dx) / dist;
			const fy = (force * dy) / dist;

			source.vx += fx;
			source.vy += fy;

			target.vx -= fx;
			target.vy -= fy;
		}

		// integrate
		for (const simNode of simNodes) {
			simNode.vx *= damping;
			simNode.vy *= damping;

			simNode.x += simNode.vx;
			simNode.y += simNode.vy;

			simNode.x = Math.max(0, Math.min(width, simNode.x));
			simNode.y = Math.max(0, Math.min(height, simNode.y));
		}
	}

	centerNodes(simNodes, width, height);

	return Object.fromEntries(
		simNodes.map((n) => [
			n.slug,
			{
				slug: n.slug,
				position: { x: n.x, y: n.y },
				size: { width: 150, height: 100 },
			},
		]),
	);
}
