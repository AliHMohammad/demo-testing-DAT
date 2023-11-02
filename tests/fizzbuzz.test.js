import fizzbuzz from "../fizzbuzz";
import fizzBuzz from "../fizzbuzz";


describe("Fizzbuzz", () => {
    it('should trow error if input is not of type number', () => {
        const args = [
            null,
            undefined,
            "",
            false,
            [],
            "string",
            {}
        ]
        for (const arg of args) {
            expect(() => {
                fizzbuzz(arg)
            }).toThrow();
        }
    });

    it('should return Buzz when giving a number that divides only by 5', () => {
        const args = [5, 10, 20];
        args.forEach(a => {
            expect(fizzBuzz(a)).toBe("Buzz")
        })
    });

    it('should return Fizz when given a number that only divides by 3', () => {
        const args = [3, 6, 12, 27];
        args.forEach(a => {
            expect(fizzBuzz(a)).toBe("Fizz")
        })
    });

    it('should return FizzBuzz when given a number that divides by 3 and 5', () => {
        const args = [0, 15, 30, 45];
        args.forEach(a => {
            expect(fizzBuzz(a)).toBe("FizzBuzz")
        })
    });

    it('should return the input when number cant be divided by 3 or 5', () => {
        const args = [1, 2, 4, 7, 8, 101]
        args.forEach(a => {
            expect(fizzBuzz(a)).toBe(a)
        })

        args.forEach(a => {
            expect(fizzBuzz(-a)).toBe(-a)
        })
    });
})