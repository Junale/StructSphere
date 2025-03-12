import { describe, test, expect } from "bun:test";
import { getPathToLayer } from "../../../../src/logic/utils/layer";
import { mockLayer } from "../../../util/mocks/layer";
import { TTestCase } from "../../../util/unit";

const parentLayer = mockLayer({ id: 1 });
const childLayer = mockLayer({ id: 2 });
parentLayer.children = [childLayer];

const testCases: TTestCase<typeof getPathToLayer>[] = [
	{
		caseName: "Get the path to root layer",
		input: [
			parentLayer,
			1
		],
		expectedResult: [parentLayer]
	},
	{
		caseName: "Get the path to child layer",
		input: [parentLayer, 2],
		expectedResult: [childLayer]
	},
	{
		caseName: "Get the path to child layer that is not present",
		input: [
			parentLayer,
			3
		],
		expectedResult: []
	}
];

describe("getPathToLayer", () => {
	testCases.forEach((testCase) => {
		test(testCase.caseName, () => {
			const result = getPathToLayer.apply(null, testCase.input);
			expect(result).toEqual(testCase.expectedResult);
		});
	});
});