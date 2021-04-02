import { allowInteger } from './input-utils';

describe('allowInteger', () => {
    test.each([
        ['123', '12', '12'],
        ['1', '', ''],
        ['123', '1234', '1234'],
        ['', '123456789', '123456789'],
        ['', '1', '1'],
        ['123', '123a', '123'],
    ])('passes old or new vals properly through', (oldVal, newVal, expected) => {
        const result = allowInteger(oldVal, newVal);

        expect(result).toEqual(expected);
    });
});
