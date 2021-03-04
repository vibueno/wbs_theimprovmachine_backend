import pool from '../utils/db';
import { QueryConfig, QueryResult } from 'pg';
import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';

class SuggestionList {
  private category: SuggestionCategory;
  private suggestions: Suggestion[];

  /**
   * Retrieves a specified amount of suggestions from the specified category from the DB.
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

  /**
   * Retrieves a specified amount of suggestions from the specified category from an API.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   * @return  Promise<string>
   */

  public static getAPISuggestions = async (
    category: number,
    amount: number
  ): Promise<string> => {
    return 'test';
  };

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
