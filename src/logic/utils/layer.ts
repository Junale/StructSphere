import TLayer from "../type/models/layer";



export function getLayerById(layer: TLayer, id: number): TLayer | undefined {
	if (layer.id === id) return layer;
	return layer.children.find((child) => child.id === id) ||
		layer.children.map((child) => getLayerById(child, id)).find(result => result !== undefined);
}

export function getPathToLayer(layer: TLayer, id: number): TLayer[] {
	if (layer.id === id) return [layer];

	for (const child of layer.children) {
		if (child.id === id) {
			return [child];
		}
		const path = getPathToLayer(child, id);
		if (path.length > 0) {
			return path;
		}
	}
	return [];
}

export function layerPlacedInTarget(layer: TLayer, target: TLayer): boolean {
	if (layer.id === target.id) return false;

	return layer.location.x >= target.location.x && layer.location.x <= target.location.x + target.width &&
		layer.location.y >= target.location.y && layer.location.y <= target.location.y + target.height;
}

export function layerPlacedInTargets(layer: TLayer, targets: TLayer[]): number | undefined {
	return targets.find((target) => layerPlacedInTarget(layer, target))?.id;
}