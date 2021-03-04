import axios from 'axios';

const apiRequest = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export { apiRequest };
