import { msgTemplateInvalid, msgTemplateArgs } from '../vars/messages';
import { TemplateInvalidError, TemplateParamsError } from '../utils/error';

import StringTemplateParams from '../types/StringTemplateParams';

const strTemplateHasParams = (strTemplate: string) => {
  if ((strTemplate.match(/\$\{.*\}/g) || []).length > 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns a message after filling-in the parametrized gaps it contains
 * @param  {string} strTemplate - Message with params to be filled-in
 * @param  {{ param: string; value: string }[]} strData - Values to be used to fill-in the message
 * @return Filled-in message
 *
 * @example: fillInStrTemplate('Hello, ${planet}', [{ planet: 'Earth' }]));
 */

const fillInStrTemplate = (
  strTemplate: string,
  strData: StringTemplateParams[]
): string => {
  if (!strTemplateHasParams(strTemplate))
    throw new TemplateInvalidError(msgTemplateInvalid);

  let filledInStr: string = strTemplate;

  strData.forEach(strDataItem => {
    filledInStr = filledInStr.replace(
      '${' + strDataItem.param + '}',
      strDataItem.value
    );
  });

  if (strTemplateHasParams(filledInStr))
    throw new TemplateParamsError(msgTemplateArgs);

  return filledInStr;
};

export { strTemplateHasParams, fillInStrTemplate };
