import { Ship } from "./ships";

test("Hit Ship", () => {
    let ship = new Ship(3);
    ship.hit();

    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);
});

test("Sink Carrier", () => {
    let ship = new Ship(5);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.hits).toBe(5);
    expect(ship.isSunk()).toBe(true);
});