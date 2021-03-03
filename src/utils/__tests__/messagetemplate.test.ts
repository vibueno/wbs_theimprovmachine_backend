import fillInMsgTemplate from '../messagetemplate';
import { TemplateInvalidError, TemplateParamsError } from '../error';

describe('Module message template', () => {
  test('it should throw an error if the template contains no params', () => {
    expect(() =>
      fillInMsgTemplate('Hello', [{ param: 'planet', value: 'Earth' }])
    ).toThrow(TemplateInvalidError);
  });

  test('it should throw an error if the template params are not well defined', () => {
    expect(() =>
      fillInMsgTemplate('Hello ${planet', [{ param: 'planet', value: 'Earth' }])
    ).toThrow(TemplateInvalidError);
  });

  test('it should throw an error if some params are not passed', () => {
    expect(() =>
      fillInMsgTemplate('Hello ${planet}', [{ param: 'star', value: 'sun' }])
    ).toThrow(TemplateParamsError);
  });

  test('it should return "Hello Earth"', () => {
    expect(
      fillInMsgTemplate('Hello ${planet}', [
        { param: 'planet', value: 'Earth' }
      ])
    ).toBe('Hello Earth');
  });
});
