import fillInMsgTemplate from '../messagetemplate';

describe('Module message template', function () {
  test('it should return "Hello world"', () => {
    expect(fillInMsgTemplate('Hello ${param}', { param: 'world' })).toBe(
      'Hello world'
    );
  });
});
