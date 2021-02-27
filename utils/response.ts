const buildResponse = (
  status: number,
  operation: string,
  message: string,
  data = []
) => {
  return {
    status: status,
    operation: operation,
    message: message,
    data: data
  };
};

export default buildResponse;
