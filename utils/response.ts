const buildResponse = (status, operation, message, data = []) => {
  return {
    status: status,
    operation: operation,
    message: message,
    data: data
  };
};

export default buildResponse;
