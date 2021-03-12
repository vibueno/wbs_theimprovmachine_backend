import axios from 'axios';
import { ExternalAPIAccessError } from '../utils/error';
import { msgAPIError } from '../vars/messages';

import { fillInStrTemplate } from '../utils/strtemplate';

const apiRequest = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    throw new ExternalAPIAccessError(
      fillInStrTemplate(msgAPIError, [{ param: 'error', value: e.message }])
    );
  }
};

export { apiRequest };
