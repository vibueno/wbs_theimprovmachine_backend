// Server
const msgServerStarted = 'Server started';
const msgServerError = 'Internal server error';

const msgPageNotFound = 'You seem lost. Are you improvising?';

// Incoming API requests
const msgQueryParamMissing = 'The query param "${paramName}" is mandatory';
const msgQueryParamWrongFormat =
  'The query param ${paramName} must be a positive integer';
const msgSuggestionsFetched =
  'Successfully fetched ${amount} suggestions of category "${suggestionCategoryTitle}"';

const msgCatNotFound = 'The requested suggestion category does not exist';

const msgCatSrcInvalid =
  'The requested suggestion category source does not exist';

// Message templates
const msgTemplateInvalid = 'The string provided does not seem to be a template';
const msgTemplateArgs = 'The arguments passed do not seem to be valid';

// API calls
const msgAPIError =
  'There was an error accessing the API needed for the selected suggestion category: ${error}.';
export {
  msgServerStarted,
  msgServerError,
  msgPageNotFound,
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgSuggestionsFetched,
  msgCatNotFound,
  msgCatSrcInvalid,
  msgTemplateInvalid,
  msgTemplateArgs,
  msgAPIError
};
