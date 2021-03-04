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

const msgCatSrcNotImplemented =
  'The requested suggestion category makes use of external APIs. This functionality has not been implemented yet';

const msgCatSrcInvalid =
  'The requested suggestion category source does not exist';

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
  msgCatNotFound,
  msgCatSrcNotImplemented,
  msgCatSrcInvalid,
  msgTemplateInvalid,
  msgTemplateArgs
};
