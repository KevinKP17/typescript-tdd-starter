import { multiply } from "./index";

// test("#add", () => {
//     expect(add(1, 3)).toEqual(4);
// })

describe("multiply", () => {
    test("if dua duanya valid num, return multiply", () => {
        expect(multiply(3, 4)).toEqual(12)
    })
    test("if satunya valid num, return numeric param", () => {
        expect(multiply("asd", 4)).toEqual(4)
        expect(multiply(4, "wqr")).toEqual(4)
    })
    test("if kedua params adalah string, maka return 1", () => {
        expect(multiply("asd", "qwr")).toEqual(1)
    })
})