import { getLayerById } from "@/logic/utils/layer";
import { mockLayer } from "test/util/mocks/layer";
import { TTestCase } from "test/util/unit";

const testCases: TTestCase<typeof getLayerById>[] = [
	{
		caseName: "Get the root layer",
		input: [
			mockLayer({
				id: 1,
				name: "1",
				children: [],
				edges: []
			}),
			1
		],
		expectedResult: mockLayer({
			id: 1,
			name: "1",
			children: [],
			edges: []
		})
	},
	{
		caseName: "Get a child layer",
		input: [
			mockLayer({ children: [mockLayer({ id: 2, name: "Test name", children: [], edges: [] })] }),
			2
		],
		expectedResult: mockLayer({
			id: 2,
			name: "Test name",
			children: [],
			edges: []
		})
	},
	{
		caseName: "Get a child layer that is not present",
		input: [
			mockLayer({ children: [mockLayer({ id: 2, name: "Test name", children: [], edges: [] })] }),
			3
		],
		expectedResult: undefined
	},
	{
		caseName: "Get a childs child layer",
		input: [
			mockLayer({ children: [mockLayer({ children: [mockLayer({ id: 3, name: "Test name", children: [], edges: [] })] })] }),
			3
		],
		expectedResult: mockLayer({ id: 3, name: "Test name", children: [], edges: [] })
	}


]


describe("getLayerById", () => {
	testCases.forEach((testCase) => {
		test(testCase.caseName, () => {
			const result = getLayerById(...testCase.input);
			expect(result).toEqual(testCase.expectedResult);
		});
	});
});
