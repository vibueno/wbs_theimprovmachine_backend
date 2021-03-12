import { strTemplateHasParams, fillInStrTemplate } from '../strtemplate';
import { TemplateInvalidError, TemplateParamsError } from '../error';

describe('Module message template', () => {
  describe('Function templateHasParams', () => {
    test('it should return true if the template contains any param', () => {
      expect(strTemplateHasParams('Hello ${param1}')).toBe(true);
    });

    test('it should return false if the params are not well defined', () => {
      expect(strTemplateHasParams('Hello ${param1')).toBe(false);
    });

    test('it should return false if the string has no params', () => {
      expect(strTemplateHasParams('Hello Earth')).toBe(false);
    });
  });

  describe('Function fillInMsgTemplate', () => {
    test('it should throw an error if the template contains no params', () => {
      expect(() =>
        fillInStrTemplate('Hello', [{ param: 'planet', value: 'Earth' }])
      ).toThrow(TemplateInvalidError);
    });

    test('it should throw an error if the template params are not well defined', () => {
      expect(() =>
        fillInStrTemplate('Hello ${planet', [
          { param: 'planet', value: 'Earth' }
        ])
      ).toThrow(TemplateInvalidError);
    });

    test('it should throw an error if some params are not passed', () => {
      expect(() =>
        fillInStrTemplate('Hello ${planet}', [{ param: 'star', value: 'sun' }])
      ).toThrow(TemplateParamsError);
    });

    test('it should return "Hello Earth"', () => {
      expect(
        fillInStrTemplate('Hello ${planet}', [
          { param: 'planet', value: 'Earth' }
        ])
      ).toBe('Hello Earth');
    });
  });
});
