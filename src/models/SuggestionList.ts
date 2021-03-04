import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';

class SuggestionList {
  private category: SuggestionCategory;
  private suggestions: Suggestion[];

  constructor(category: SuggestionCategory, suggestions: Suggestion[]) {
    this.category = category;
    this.suggestions = suggestions;
  }

  getCategory = (): SuggestionCategory => {
    return this.category;
  };

  getSuggestions = (): Suggestion[] => {
    return this.suggestions;
  };
}

export default SuggestionList;
