import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculateTotal';

describe('calculateTotal', () => {
    it('returns the sum of comma-separated numbers', () => {
        expect(calculateTotal('100,200,300')).toBe(600);
    });

    it('returns the sum of newline-separated numbers', () => {
        expect(calculateTotal('10\n20\n30')).toBe(60);
    });

    it('ignores extra spaces and still calculates correctly', () => {
        expect(calculateTotal('  5 ,   15, 25 ')).toBe(45);
    });

    it('handles mixed commas and newlines', () => {
        expect(calculateTotal('1,2\n3,4\n5')).toBe(15);
    });

    it('returns 0 when input is empty', () => {
        expect(calculateTotal('')).toBe(0);
    });

    it('returns 0 when any value is not a number', () => {
        expect(calculateTotal('100,abc,200')).toBe(0);
    });

    it('handles decimal values correctly', () => {
        expect(calculateTotal('1.5, 2.5, 3.5')).toBeCloseTo(7.5, 5);
    });

    it('handles large numbers without overflow', () => {
        const big = '1000000000000000000,2000000000000000000';
        expect(calculateTotal(big)).toBe(3000000000000000000);
    });

    it('handles single value correctly', () => {
        expect(calculateTotal('42')).toBe(42);
    });

    it('ignores trailing separators', () => {
        expect(calculateTotal('10,20,30,')).toBe(60);
        expect(calculateTotal('10\n20\n30\n')).toBe(60);
    });
});
