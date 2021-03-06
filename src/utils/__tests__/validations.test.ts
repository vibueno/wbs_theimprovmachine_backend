import { isPositiveInt, isNotNullNorUndefined } from '../validations';

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

  describe('Function isNotNullNorUndefined', () => {
    test('it should return false for a null value', () => {
      expect(isNotNullNorUndefined(null as any)).toBe(false);
    });

    test('it should return false for an undefinied value', () => {
      expect(isNotNullNorUndefined(undefined as any)).toBe(false);
    });

    test('it should return true for a defined value', () => {
      expect(isNotNullNorUndefined('-5')).toBe(true);
    });
  });
});
