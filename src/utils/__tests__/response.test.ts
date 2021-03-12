import { buildResponse, buildResponseData } from '../response';
import { httpResponse, operationResult } from '../../vars/constants';

import SuggestionCategory from '../../models/SuggestionCategory';
import Suggestion from '../../models/Suggestion';

import ResponseSuggestions from '../../types/ResponseSuggestion';
import ResponseData from '../../types/ResponseData';

describe('Module validations', () => {
  const responseSuggestions: ResponseSuggestions[] = [
    { picture: 'test.jpg' },
    { picture: 'test2.jpg' }
  ];

  const responseData: ResponseData = {
    category: 'ramdomimages',
    contenttype: 'image',
    suggestions: responseSuggestions
  };

  const response = buildResponse(
    httpResponse.OK,
    operationResult.success,
    'Successfully retrieved 2 test images',
    responseData
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

    test('it should return null for "data" if no value provided', () => {
      expect(
        buildResponse(
          httpResponse.OK,
          operationResult.success,
          'Suggestions retrieved successfully'
        ).data
      ).toBeNull;
    });
  });

  describe('Function buildResponseData', () => {
    const suggestionCategory = new SuggestionCategory(
      1,
      'testcategory',
      'image',
      'DB',
      'http//test.com',
      null as any,
      null as any
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
