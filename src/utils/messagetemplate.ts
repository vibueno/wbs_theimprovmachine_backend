/**
 * Returns a message after filling-in the parametrized gaps it contains
 * @param  msgTemplate  Message with params to be filled-in
 * @param  msgData      Values to be used to fill-in the message
 * @return              Filled-in message
 *
 * @example: fillInMsgTemplate('Hello, ${planet}', { planet: 'Earth' }));
 */
const fillInMsgTemplate = (msgTemplate: string, msgData: object): string => {
  const makeTemplate = (templateString: string) => {
    return (templateData: object) =>
      new Function(
        `{${Object.keys(templateData).join(',')}}`,
        'return `' + templateString + '`'
      )(templateData);
  };

  const tpl = makeTemplate(msgTemplate);
  const filledInMessage: string = tpl(msgData);
  return filledInMessage;
};

export default fillInMsgTemplate;
