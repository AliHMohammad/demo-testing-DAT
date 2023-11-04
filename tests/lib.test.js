import lib from "../lib";
import db from "../db"
import send from "../mail"
import mail from "../mail";

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


describe("applyDiscount mocking", () => {

    afterEach(() => {
        // restore replaced property
        jest.restoreAllMocks();
    });

    it('should apply discount when customer.points > 10', () => {
        const mock = jest.spyOn(db, "getCustomerSync").mockReturnValueOnce({
            id: 2,
            points: 15
        });

        const order = {
            customerId: 2,
            totalPrice: 100
        }

        lib.applyDiscount(order);

        expect(order).toHaveProperty("totalPrice", 90);
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(order.customerId);
        expect(mock).toHaveReturnedWith({id: 2, points: 15})
    });

    it('should not apply discount when customer.points < 10', () => {
        const mock = jest.spyOn(db, "getCustomerSync").mockReturnValueOnce({
            id: 4,
            points: 2
        });

        const order = {
            customerId: 4,
            totalPrice: 50
        };

        lib.applyDiscount(order);

        expect(order).toHaveProperty("totalPrice", 50);
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(order.customerId);
        expect(mock).toHaveReturnedWith({id: 4, points: 2})
    });
})

describe("notify customer mocking",  () => {
    afterEach(() => {
        // restore replaced property
        jest.restoreAllMocks();
    });

    it('should ', () => {
        const dbMock = jest.spyOn(db, "getCustomerSync").mockReturnValueOnce({
            id: 5,
            points: 10
        })

        const mailMock = jest.spyOn(mail, "send");

        const order = {
            customerId: 5,
            totalPrice: 10
        }

        lib.notifyCustomer(order);

        expect(dbMock).toHaveBeenCalledTimes(1);
        expect(dbMock).toHaveBeenCalledWith(order.customerId);
        expect(dbMock).toHaveReturnedWith({id: 5, points: 10});
        expect(mailMock).toHaveBeenCalledTimes(1);
        expect(mailMock).toHaveBeenCalledWith(undefined, "Your order was placed successfully.");
        expect(mailMock).toHaveReturnedWith(undefined);
    });
})

