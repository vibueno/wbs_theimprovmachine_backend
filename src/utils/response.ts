import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';

import ResponseData from '../types/ResponseData';
import Response from '../types/Response';

const buildResponse = (
  status: number,
  operation: string,
  message: string,
  data: object = {}
): Response => {
  return {
    status: status,
    operation: operation,
    message: message,
    data: data
  };
};
const buildResponseData = (
  category: SuggestionCategory,
  suggestions: Suggestion[]
): ResponseData => {
  const suggestionsContent = suggestions.map(suggestion =>
    suggestion.getContent()
  );

  return {
    category: category.getTitle(),
    contenttype: category.getContentType(),
    suggestions: suggestionsContent
  };
};

export { buildResponse, buildResponseData };
