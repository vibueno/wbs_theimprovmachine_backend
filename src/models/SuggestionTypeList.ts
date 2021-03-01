import SuggestionType from './SuggestionType';

class SuggestionTypeList {
  private type: number;
  private quantity: number;
  private suggestions: [SuggestionType];
  constructor(type: number, quantity: number) {
    this.type = type;
    this.quantity = quantity;

    // TODO: We should get information from the database here and
    // fill-in the property suggestions
    this.suggestions = [new SuggestionType('my title', 'my content')];
  }

  getSuggestions = (): [SuggestionType] => {
    return this.suggestions;
  };
}

export default SuggestionTypeList;
