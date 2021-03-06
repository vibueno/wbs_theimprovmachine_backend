import axios from 'axios';
import { APIAccessError } from '../utils/error';
import { msgAPIError } from '../vars/messages';

import { fillInStrTemplate } from '../utils/strtemplate';

const apiRequest = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    throw new APIAccessError(
      fillInStrTemplate(msgAPIError, [{ param: 'error', value: e.message }])
    );
  }
};

export { apiRequest };
