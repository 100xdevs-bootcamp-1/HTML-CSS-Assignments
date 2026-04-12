
const { fibonacci, fibonacciRecursive } = require('../problems/easy/fibonacci');

describe('Fibonacci function', () => {
    test('should return the first 10 Fibonacci numbers using the iterative approach', () => {
        expect(fibonacci(10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    test('should return the first 5 Fibonacci numbers using the iterative approach', () => {
        expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
    });

    test('should return the first 10 Fibonacci numbers using the recursive approach', () => {
        expect(fibonacciRecursive(10)).toBe(55); // 10th Fibonacci number is 55
    });

    test('should return the 5th Fibonacci number using the recursive approach', () => {
        expect(fibonacciRecursive(5)).toBe(5); // 5th Fibonacci number is 5
    });

    test('should return 0 for the 0th Fibonacci number using the recursive approach', () => {
        expect(fibonacciRecursive(0)).toBe(0); // 0th Fibonacci number is 0
    });

    test('should return 1 for the 1st Fibonacci number using the recursive approach', () => {
        expect(fibonacciRecursive(1)).toBe(1); // 1st Fibonacci number is 1
    });
});
