import TLayer from "../type/models/layer";



export function getLayerById(layer: TLayer, id: number): TLayer | undefined {
	if (layer.id === id) return layer;
	return layer.children.find((child) => child.id === id) ||
		layer.children.map((child) => getLayerById(child, id)).find(result => result !== undefined);
}

export function getPathToLayer(layer: TLayer, id: number): TLayer[] {
	const path: TLayer[] = [];
	layer.children.forEach((child) => {
		if (child.id === id) {
			path.push(child);
		} else {
			path.push(...getPathToLayer(child, id));
		}
	});
	return path;
}
