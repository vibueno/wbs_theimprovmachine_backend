import ResponseSuggestion from '../types/ResponseSuggestion';

class Suggestion {
  private content: ResponseSuggestion;

  constructor(content: ResponseSuggestion) {
    this.content = content;
  }

  getContent = (): ResponseSuggestion => this.content;
}

export default Suggestion;
