const buildResponse = (
  status: number,
  operation: string,
  message: string,
  data: Array<any> = []
) => {
  return {
    status: status,
    operation: operation,
    message: message,
    data: data
  };
};

export default buildResponse;
