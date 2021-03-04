import { QueryConfig, QueryResult } from 'pg';

import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';
import SuggestionList from '../models/SuggestionList';

import pool from '../utils/db';

class SuggestionListDB extends SuggestionList {
  /**
   * Retrieves a specified amount of suggestions from the specified category.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   * @return  Promise<QueryResult>
   */

  public static getDBSuggestions = async (
    category: number,
    amount: number
  ): Promise<QueryResult> => {
    const sqlQuery = `
      SELECT sc.id, sc.title, sc.basepath, s.content
      FROM suggestion s
      JOIN suggestioncategory sc ON s.suggestioncategoryid = $1
      WHERE sc.id = s.suggestioncategoryid
      ORDER BY RANDOM()
      LIMIT $2;`;

    const query: QueryConfig = {
      text: sqlQuery,
      values: [category, amount]
    };
    const suggestions: QueryResult = await pool.query(query);

    return new Promise<QueryResult>(resolve => {
      resolve(suggestions);
    });
  };

  constructor(category: SuggestionCategory, suggestions: Suggestion[]) {
    super(category, suggestions);
  }
}

export default SuggestionListDB;
