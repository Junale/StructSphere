import { getPathToLayer } from "@/logic/utils/layer";
import { mockLayer } from "test/util/mocks/layer";
import { testFunction, TTestCase } from "test/util/unit";

const testCases: TTestCase<typeof getPathToLayer>[] = [
	{
		caseName: "Get the path to root layer",
		input: [
			mockLayer({ id: 1, name: "Test name", children: [], edges: [] }),
			1
		],
		expectedResult: [mockLayer({ id: 1, name: "Test name", children: [], edges: [] })]
	},
	{
		caseName: "Get the path to a child layer",
		input: [
			mockLayer({ id: 1, name: "Test name", children: [mockLayer({ id: 2, name: "Test name", children: [], edges: [] })], edges: [] }),
			2
		],
		expectedResult: [mockLayer({ id: 1, name: "Test name", children: [mockLayer({ id: 2, name: "Test name", children: [], edges: [] })], edges: [] })]
	},
	{
		caseName: "Get the path to a child layer that is not present",
		input: [
			mockLayer({ id: 1, name: "Test name", children: [], edges: [] }),
			2
		],
		expectedResult: []
	}
]

testFunction("getPathToLayer", testCases, getPathToLayer);