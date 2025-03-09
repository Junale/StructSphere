import { describe, it, expect } from "bun:test";

export type TTestCase<T extends (...args: any[]) => any> = { caseName: string, input: Parameters<T>, expectedResult: ReturnType<T> }

export function testFunction<T extends (...args: any[]) => any>(description: string, testCases: TTestCase<T>[], uut: T) {
	describe(description, () => {
		testCases.forEach((testCase) => {
			it(testCase.caseName, () => {
				const result = uut(...testCase.input)
				expect(result).toEqual(testCase.expectedResult)
			})
		})
	})
}