import buildResponse from '../response';
import { httpOK, resOpSuccess } from '../../vars/constants';

describe('Module validations', () => {
  const response = buildResponse(
    httpOK,
    resOpSuccess,
    'Suggestions retrieved successfully',
    [{ picture: 'test.jpg' }, { picture: 'test2.jpg' }]
  );

  describe('Function buildResponse', () => {
    test('it should return an object with 4 keys', () => {
      expect(Object.keys(response).length).toEqual(4);
    });

    test('it should return an object with a key called "status"', () => {
      expect(response.status).toBeDefined();
    });

    test('it should return an object with a key called "operation"', () => {
      expect(response.operation).toBeDefined();
    });

    test('it should return an object with a key called "message"', () => {
      expect(response.message).toBeDefined();
    });

    test('it should return an object with a key called "data"', () => {
      expect(response.data).toBeDefined();
    });

    test('it should return an empty array for "data" if no value provided', () => {
      expect(
        buildResponse(
          httpOK,
          resOpSuccess,
          'Suggestions retrieved successfully'
        ).data
      ).toStrictEqual([]);
    });
  });
});
