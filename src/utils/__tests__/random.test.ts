import { randomString } from '../random';

describe('Module random', () => {
  test('it should return a string of length 5', () => {
    expect(randomString(5).length).toBe(5);
  });

  test('2 generated strings should be different', () => {
    expect(randomString(5) != randomString(5)).toBe(true);
  });
});
