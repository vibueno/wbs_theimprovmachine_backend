import { buildResponse, buildResponseData } from '../response';
import { httpResponse, operationResult } from '../../vars/constants';

import SuggestionCategory from '../../models/SuggestionCategory';
import Suggestion from '../../models/Suggestion';

describe('Module validations', () => {
  const response = buildResponse(
    httpResponse.OK,
    operationResult.success,
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

    test('it should return an empty object for "data" if no value provided', () => {
      expect(
        buildResponse(
          httpResponse.OK,
          operationResult.success,
          'Suggestions retrieved successfully'
        ).data
      ).toStrictEqual({});
    });
  });

  describe('Function buildResponseData', () => {
    const suggestionCategory = new SuggestionCategory(
      1,
      'testcategory',
      'image',
      'DB',
      'http//test.com'
    );

    const suggestions: Suggestion[] = [];

    suggestions.push(new Suggestion({ title: 'testtitle' }));
    suggestions.push(new Suggestion({ title: 'testtitle2' }));

    const response = buildResponseData(suggestionCategory, suggestions);

    test('it should return an object of type ResponseData', () => {
      expect(response.category).toBeDefined();
    });

    test('it should return an object of type ResponseData', () => {
      expect(response.suggestions).toBeDefined();
    });
  });
});
