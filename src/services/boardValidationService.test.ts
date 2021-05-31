import { isArrayValid } from "./boardValidationService";

describe("isArrayValid method", () => {
	it("returns true if the array is valid", () => {
		expect(isArrayValid([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(true);
		expect(isArrayValid([9, 2, 6, 4, 5, 3, 7, 8, 1])).toBe(true);
	});

	it("returns false if the array is invalid", () => {
		expect(isArrayValid([1, 4, 3, 4, 5, 6, 5, 8, 9])).toBe(false);
		expect(isArrayValid([9, 2, 3, 4, 5, 3, 99, 8, 1])).toBe(false);
	});
});
