// Server
const msgServerStarted = 'Server started';
const msgServerError = 'Internal server error';

const msgPageNotFound =
  'You seem lost. Let me guess... You are improvising! lol';

// Message templates
const msgTemplateInvalid = 'The string provided does not seem to be a template';
const msgTemplateArgs = 'The arguments passed do not seem to be valid';

// Incoming API requests
const msgQueryParamMissing = 'The query param ${paramName} is mandatory';
const msgQueryParamWrongFormat =
  'The query param ${paramName} must be a positive integer';
const msgQueryParamMaxAmount =
  'The maximum amount of suggestions you can request is: ${maxAmount}';

const msgSuggestionsFetched =
  'Successfully fetched ${amount} suggestion(s) of category ${suggestionCategoryTitle}';
const msgCatNotFound = 'The requested suggestion category does not exist';
const msgCatSrcInvalid =
  'The requested suggestion category source does not exist';

// External API requests
const msgAPIError =
  'There was an error accessing the API needed for the selected suggestion category: ${error}.';

export {
  msgServerStarted,
  msgServerError,
  msgPageNotFound,
  msgTemplateInvalid,
  msgTemplateArgs,
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgQueryParamMaxAmount,
  msgSuggestionsFetched,
  msgCatNotFound,
  msgCatSrcInvalid,
  msgAPIError
};
