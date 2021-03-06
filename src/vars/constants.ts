enum httpResponse {
  OK = 200,
  badRequest = 400,
  notFound = 404,
  serverError = 500
}

enum operationResult {
  success = 'succeeded',
  fail = 'failed'
}

enum categorySources {
  DB = 'DB',
  API = 'API'
}

const maxSuggestionsPerRequest = 10;

export {
  httpResponse,
  operationResult,
  categorySources,
  maxSuggestionsPerRequest
};
