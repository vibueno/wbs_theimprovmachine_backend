import { Pool } from 'pg';
import pool from '../db';

describe('Module db', () => {
  test('it should return an object of type Pool', () => {
    expect(pool).toBeInstanceOf(Pool);
  });
});
