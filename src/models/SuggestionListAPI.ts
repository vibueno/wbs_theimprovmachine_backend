import { QueryConfig, QueryResult } from 'pg';

import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';
import SuggestionList from '../models/SuggestionList';

import pool from '../utils/db';

class SuggestionListAPI extends SuggestionList {
  /**
   * Retrieves a specified amount of suggestions from the specified category.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   * @return  Promise<QueryResult>
   */

  public static getAPISuggestions = async (
    category: number,
    amount: number
  ): Promise<string> => {
    return 'test';
  };

  constructor(category: SuggestionCategory, suggestionsAPI: Suggestion[]) {
    super(category, suggestionsAPI);
  }
}

export default SuggestionListAPI;
