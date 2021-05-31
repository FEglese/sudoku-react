import {
	isArrayValid,
	getCol,
	getSquareValues,
} from "./boardValidationService";

import { fullInvalidBoard } from "./testConstants";

import Cell from "../interfaces/cell";

const inputBoard1: Cell[][] = Array(9).fill(
	Array(9).fill({ value: 1, isFixed: false })
);

const inputBoard2: Cell[][] = Array(9).fill(
	Array(9).fill({ value: 4, isFixed: false })
);

describe("isArrayValid method", () => {
	it("returns true if the array is valid", () => {
		expect(isArrayValid([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBe(true);
		expect(isArrayValid([9, 2, 6, 4, 5, 3, 7, 8, 1])).toBe(true);
	});

	it("returns false if the array is invalid", () => {
		expect(isArrayValid([1, 4, -3, 4, 5, 6, 5, 8, 9])).toBe(false);
		expect(isArrayValid([9, 2, 3, 4, 5, 3, 99, 8, 1])).toBe(false);
	});
});

describe("getCol method", () => {
	it("Returns the corect values in basic cases", () => {
		expect(getCol(0, inputBoard1)).toMatchObject(Array(9).fill(1));
		expect(getCol(3, inputBoard2)).toMatchObject(Array(9).fill(4));
	});

	it("Returns the corect values in complex cases", () => {
		expect(getCol(0, fullInvalidBoard)).toMatchObject([
			9, 5, 9, 7, 9, 5, 1, 7, 1,
		]);

		expect(getCol(2, fullInvalidBoard)).toMatchObject([
			4, 2, 3, 8, 1, 1, 6, 5, 7,
		]);
	});
});

describe("getSquareValues validation", () => {
	it("Returns empty for an input too short (0)", () => {
		expect(() => {
			getSquareValues(0, []);
		}).toThrow("Invalid Params");
	});

	it("Returns empty for an input too long (10)", () => {
		expect(() => {
			getSquareValues(0, [[], [], [], [], [], [], [], [], [], []]);
		}).toThrow("Invalid Params");
	});

	it("Throws error if square value is invalid", () => {
		expect(() => {
			getSquareValues(12, [[], [], [], [], [], [], [], [], []]);
		}).toThrow("Invalid Params");

		expect(() => {
			getSquareValues(-3, [[], [], [], [], [], [], [], [], []]);
		}).toThrow("Invalid Params");
	});
});

describe("getSquareValues correct return values", () => {
	it("returns the correct value from a valid input", () => {
		expect(getSquareValues(0, fullInvalidBoard)).toMatchObject([
			9, 1, 4, 5, 3, 2, 9, 1, 3,
		]);

		expect(getSquareValues(8, fullInvalidBoard)).toMatchObject([
			2, 4, 7, 6, 8, 3, 2, 9, 6,
		]);

		expect(getSquareValues(2, fullInvalidBoard)).toMatchObject([
			8, 2, 6, 1, 7, 9, 8, 6, 7,
		]);
	});
});
