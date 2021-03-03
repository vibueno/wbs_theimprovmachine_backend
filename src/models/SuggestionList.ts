import Suggestion from '../models/Suggestion';

abstract class SuggestionList {
  private category: number;
  private suggestions: Suggestion[];

  constructor(category: number, suggestions: Suggestion[]) {
    this.category = category;
    this.suggestions = suggestions;
  }

  getSuggestionCategory = (): number => {
    return this.category;
  };

  getSuggestions = (): Suggestion[] => {
    return this.suggestions;
  };
}

export default SuggestionList;
