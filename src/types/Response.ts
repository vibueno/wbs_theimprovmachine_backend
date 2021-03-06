import ResponseData from './ResponseData';
type Response = {
  status: number;
  operation: string;
  message: string;
  data: ResponseData;
};

export default Response;
