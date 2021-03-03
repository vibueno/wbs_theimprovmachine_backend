import { msgTemplateParamCount, msgNoTemplate } from '../vars/messages';
import { TemplateParamsError, NoTemplateError } from '../utils/error';

const countTemplateParams = (msgTemplate: string): number => {
  const count: number = (msgTemplate.match(/\$\{/g) || []).length;
  return count;
};

/**
 * Returns a message after filling-in the parametrized gaps it contains
 * @param  msgTemplate  Message with params to be filled-in
 * @param  msgData      Values to be used to fill-in the message
 * @return              Filled-in message
 *
 * @example: fillInMsgTemplate('Hello, ${planet}', { planet: 'Earth' }));
 */
const fillInMsgTemplate = (msgTemplate: string, msgData: object): string => {
  if (countTemplateParams(msgTemplate) != Object.keys(msgData).length)
    throw new TemplateParamsError(msgTemplateParamCount);

  if (
    countTemplateParams(msgTemplate) === 0 &&
    Object.keys(msgData).length === 0
  )
    throw new NoTemplateError(msgNoTemplate);

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
