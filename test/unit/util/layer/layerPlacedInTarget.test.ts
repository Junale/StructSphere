import { describe, test, expect } from "bun:test";
import { layerPlacedInTarget } from "../../../../src/logic/utils/layer";
import { mockLayer } from "../../../util/mocks/layer";
import { TTestCase } from "../../../util/unit";

const testCases: TTestCase<typeof layerPlacedInTarget>[] = [
	{
		caseName: "Layer is placed in target",
		input: [
			mockLayer({ location: { x: 0, y: 0 }, width: 100, height: 100 }),
			mockLayer({ location: { x: 0, y: 0 }, width: 100, height: 100 })
		],
		expectedResult: true
	},
	{
		caseName: "Layer is not placed in target",
		input: [
			mockLayer({ location: { x: 0, y: 0 }, width: 100, height: 100 }),
			mockLayer({ location: { x: 100, y: 100 }, width: 100, height: 100 })
		],
		expectedResult: false
	}
];

describe("layerPlacedInTarget", () => {
	testCases.forEach((testCase) => {
		test(testCase.caseName, () => {
			const result = layerPlacedInTarget.apply(null, testCase.input);
			expect(result).toBe(testCase.expectedResult);
		});
	});
});
