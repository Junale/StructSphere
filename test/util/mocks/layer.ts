import TLayer from "@/logic/type/models/layer";
import { mockId } from "test/util/mocks/id";

export function mockLayer(layer?: Partial<TLayer>): TLayer {
	return {
		id: mockId(),
		name: "Mock Layer",
		children: [],
		edges: [],
		location: { x: 0, y: 0 },
		width: 100,
		height: 100,
		...layer
	}
}
