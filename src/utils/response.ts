import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';

import ResponseSuggestion from '../types/ResponseSuggestion';
import ResponseSuggestionData from '../types/ResponseSuggestionData';

import ResponseSuggestionCategory from '../types/ResponseSuggestionCategory';
import ResponseSuggestionCategoryData from '../types/ResponseSuggestionCategoryData';

import Response from '../types/Response';

const buildResponse = (
  status: number,
  operation: string,
  message: string,
  data: any = []
): Response => {
  return {
    status: status,
    operation: operation,
    message: message,
    data: data
  };
};

const buildSuggestionResponseData = (
  category: SuggestionCategory,
  suggestions: Suggestion[]
): ResponseSuggestionData => {
  const suggestionsContent: ResponseSuggestion[] = suggestions.map(suggestion =>
    suggestion.getContent()
  );

  return {
    category: category.getName(),
    contenttype: category.getContentType(),
    suggestions: suggestionsContent
  };
};

const buildSuggestionCategoryResponse = (
  status: number,
  operation: string,
  message: string,
  data: ResponseSuggestionCategoryData = null as any
): Response => {
  return {
    status: status,
    operation: operation,
    message: message,
    data: data
  };
};

const buildSuggestionCategoriesResponseData = (
  suggestionCategories: SuggestionCategory[]
): ResponseSuggestionCategoryData => {
  let response: ResponseSuggestionCategory[] = [];

  suggestionCategories.forEach(suggestionCategory =>
    response.push({
      id: suggestionCategory.getId().toString(),
      name: suggestionCategory.getName(),
      title: suggestionCategory.getTitle(),
      description: suggestionCategory.getDescription()
    })
  );

  return response;
};

export {
  buildResponse,
  buildSuggestionResponseData,
  buildSuggestionCategoryResponse,
  buildSuggestionCategoriesResponseData
};
