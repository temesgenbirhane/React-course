import { it, expect, describe } from 'vitest';  // it lets us create a test and expect has methods that we can use to check if the output of our function is correct. We will use toBe() method of expect to check if the output is what we expect it to be.
// describe groups related tests together AKA test suit
import { formatMoney } from './money';  // import the function we want to test

describe('formatMoney', () => {
    it('formats 1999 cents as $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99');
});

it('displays 2 deciamls', () => {
    expect(formatMoney(1090)).toBe('$10.90');
    expect(formatMoney(100)).toBe('$1.00');
});
it('works with the number 0', () => {
    expect(formatMoney(0)).toBe('$0.00');
});
it('works with negative numbers', () => {
    expect(formatMoney(-599)).toBe('$-5.99');    
})

});
