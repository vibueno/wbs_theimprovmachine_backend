import axios from 'axios';
import { APIAccessError } from '../utils/error';
import { msgAPIError } from '../vars/messages';

const apiRequest = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    throw new APIAccessError(msgAPIError);
  }
};

export { apiRequest };
