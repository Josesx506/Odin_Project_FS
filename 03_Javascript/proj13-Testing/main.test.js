const capitalize = require("./main").capitalize;
const reverseString = require("./main").reverseString;
const calculator = require("./main").calculator;
const caesarCipher = require("./main").caesarCipher;
const analyzeArray = require("./main").analyzeArray;


describe("test 1", () => {
    let comparisons = [
        {input:"boy", expected:"Boy"},
        {input:"nigeria", expected:"Nigeria"},
    ];

    test.each(comparisons)("Capitalize tests", ({ input,expected }) => {
        expect(capitalize(input)).toBe(expected);
    });
});

describe("test 2", () => {
    let comparisons = [
        {input:"apples", expected:"selppa"},
        {input:"nigeria", expected:"airegin"},
        {input:"arizona", expected:"anozira"},
        {input:"madam", expected:"madam"}
    ];

    test.each(comparisons)("Reverse string tests", ({ input,expected }) => {
        expect(reverseString(input)).toBe(expected);
    });
});

describe("test 3", () => {
    let comparisons = [
        {a:1, b:2, opr:"add", expected:3},
        {a:2, b:2, opr:"subtract", expected:0},
        {a:3, b:2, opr:"multiply", expected:6},
        {a:0, b:5, opr:"divide", expected:0},
        {a:15, b:5, opr:"divide", expected:3}
    ];

    test.each(comparisons)("Calculator tests", ({ a,b,opr,expected }) => {
        expect(calculator(a,b,opr)).toBe(expected);
    });

    // Match a string that must be contained in the error message or a regexp
    test("zero division test", () => {
        expect(() => calculator(5,0,"divide")).toThrow(/zero div/);
    })
});

describe("test 4", () => {
    let comparisons = [
        {input:"xyz", shift:3, expected:"abc"},
        {input:"HeLLo", shift:3, expected:"KhOOr"},
        {input:"Hello, World!", shift:3, expected:"Khoor, Zruog!"}
    ];

    test.each(comparisons)("Caesar Cipher tests", ({ input,shift,expected }) => {
        expect(caesarCipher(input,shift)).toMatch(expected);
    });
});


test("Analyze an empty array", () => {
    expect(() => analyzeArray([])).toThrow(/empty/);
});

test("Analyze a populated array", () => {
    expect(analyzeArray([2,4,6,8])).toEqual({
        average: 5, min: 2, max: 8, length: 4
    })
});