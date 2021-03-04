import { msgTemplateInvalid, msgTemplateArgs } from '../vars/messages';
import { TemplateInvalidError, TemplateParamsError } from '../utils/error';

const templateHasParams = (msgTemplate: string) => {
  if ((msgTemplate.match(/\$\{.*\}/g) || []).length > 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns a message after filling-in the parametrized gaps it contains
 * @param  {string} msgTemplate - Message with params to be filled-in
 * @param  {{ param: string; value: string }[]} msgData - Values to be used to fill-in the message
 * @return Filled-in message
 *
 * @example: fillInMsgTemplate('Hello, ${planet}', [{ planet: 'Earth' }]));
 */
const fillInMsgTemplate = (
  msgTemplate: string,
  msgData: { param: string; value: string }[]
): string => {
  if (!templateHasParams(msgTemplate))
    throw new TemplateInvalidError(msgTemplateInvalid);

  let filledInMessage: string = msgTemplate;

  msgData.forEach(msgDataItem => {
    filledInMessage = filledInMessage.replace(
      '${' + msgDataItem.param + '}',
      msgDataItem.value
    );
  });

  if (templateHasParams(filledInMessage))
    throw new TemplateParamsError(msgTemplateArgs);

  return filledInMessage;
};

export { templateHasParams, fillInMsgTemplate };
