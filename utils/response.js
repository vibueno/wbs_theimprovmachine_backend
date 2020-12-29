const buildResponse = (status, operation, message, data = []) => {
  return {
    status: status,
    operation: operation,
    message: message,
    data: data
  };
};

module.exports = buildResponse;
