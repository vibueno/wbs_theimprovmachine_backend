import { isPositiveInt } from '../validations';

describe('Module validation', () => {
  describe('Function isPositiveInt', () => {
    test('it should return true for a positive integer', () => {
      expect(isPositiveInt('5')).toBe(true);
    });

    test('it should return false for 0', () => {
      expect(isPositiveInt('0')).toBe(false);
    });

    test('it should return false for a negative number', () => {
      expect(isPositiveInt('-5')).toBe(false);
    });

    test('it should return false for a string', () => {
      expect(isPositiveInt('test')).toBe(false);
    });
  });
});
