import TLayer from "@/logic/type/models/layer";
import { mockId } from "test/util/mocks/id";

export function mockLayer(layer?: Partial<TLayer>) {
	return {
		id: mockId(),
		name: "Mock Layer",
		children: [],
		edges: [],
		...layer
	}
}
