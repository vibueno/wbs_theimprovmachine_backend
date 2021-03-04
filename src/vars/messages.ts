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

const msgCatSrcNotImplemented =
  'The requested suggestion category makes use of external APIs. This functionality has not been implemented yet';

// Message templates
const msgTemplateInvalid = 'The string provided does not seem to be a template';
const msgTemplateArgs = 'The arguments passed do not seem to be valid';

export {
  msgServerStarted,
  msgServerError,
  msgPageNotFound,
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgSuggestionsFetched,
  msgCatSrcNotImplemented,
  msgTemplateInvalid,
  msgTemplateArgs
};
