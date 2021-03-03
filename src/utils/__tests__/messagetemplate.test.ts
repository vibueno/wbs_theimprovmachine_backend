import fillInMsgTemplate from '../messagetemplate';
import { TemplateParamsError, NoTemplateError } from '../error';

describe('Module message template', () => {
  test('it should return "Hello world"', () => {
    expect(fillInMsgTemplate('Hello ${param}', { param: 'world' })).toBe(
      'Hello world'
    );
  });

  test('it should throw an error if there are no params and no data', () => {
    expect(() => fillInMsgTemplate('Hello', {})).toThrow(NoTemplateError);
  });

  test('it should throw an error if amount of params and data items do not match', () => {
    expect(() => fillInMsgTemplate('Hello ${param}', {})).toThrow(
      TemplateParamsError
    );
  });
});
