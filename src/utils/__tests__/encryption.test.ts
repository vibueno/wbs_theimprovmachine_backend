import { encrypt, decrypt } from '../encryption';

describe('Module encryption', () => {
  test('it should return the same value after encryption and decryption', () => {
    const testString = 'test';
    expect(decrypt(encrypt(testString)) === testString).toBe(true);
  });
});
