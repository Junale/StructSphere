
export type TTestCase<T extends (...args: any[]) => any> = { caseName: string, input: Parameters<T>, expectedResult: ReturnType<T> }
