const sum = require("./sum");

it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 5 + 2 to equal 7", () => {
    expect(sum(5, 2)).toBe(7);
});

test("adds 5 + 4 to equal 9", () => {
    expect(sum(5, 4)).toBe(9);
});