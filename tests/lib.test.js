import lib from "../lib";

describe("Should return the correct number", () => {
    it("Should return positive", () => {
        expect(lib.absolute(10)).toBe(10);
    })

    it("Should return positive with a negative number", () => {
        expect(lib.absolute(-10)).toBe(10)
    })

    it("Should return 0 with 0 parameter", () => {
        expect(lib.absolute(0)).toBe(0);
    })
})

describe("Should return a name concatinated with 'welcome'", () => {
    it('should return "Welcome Ali"', () => {
        expect(lib.greet("Ali")).toBe("Welcome Ali");
    });

    it('should return "Welcome undefined" when nothing given', () => {
        expect(lib.greet()).toBe("Welcome undefined");
    });
})

describe("Should return a currency arr", () => {
    it('should return ["USD", "AUD", "EUR"]', () => {
        const arr = lib.getCurrencies()
        expect(arr[0]).toBe("USD");
        expect(arr[1]).toBe("AUD");
        expect(arr[2]).toBe("EUR");
        expect(arr.length).toBe(3);
    });
})

describe("Test objects", () => {
    it('should return an object with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toMatchObject({id: 1, price: 10});
        expect(result).toHaveProperty("id", 1);
        expect(result).toHaveProperty("price", 10);

        expect(result).toEqual({id: 1, price: 10})
    });
})

describe("Test exceptions", () => {
    it('should throw error when nothing is given', () => {
        const args = [
            null,
            undefined,
            0,
            "",
            false,
            NaN
        ]

        for (const falsy of args){
            //For at teste throw, så skal du skrive det i en anon-function
            expect(() => {
                lib.registerUser(falsy)
            }).toThrow()
        }
    });
})


describe("Mock functions", () => {
    it('should apply discount when points > 10', () => {
        jest.fn().mockReturnValue({points: 11})

        const order = {
            customerId: 2,
            totalPrice: 100
        }

        lib.applyDiscount(order)

        expect(order.totalPrice).toBe(90)
    });
})

