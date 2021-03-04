import pool from '../utils/db';
import { QueryConfig, QueryResult } from 'pg';
import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';

import { fillInStrTemplate } from '../utils/strtemplate';
import { randomString } from '../utils/random';

class SuggestionList {
  private category: SuggestionCategory;
  private suggestions: Suggestion[];

  /**
   * Retrieves a specified amount of suggestions from the specified category from the DB.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   *
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
   *
   * @return  Promise<string>
   */

  public static getAPISuggestions = async (
    category: number,
    amount: number
  ): Promise<string> => {
    return 'test';
  };

  /**
   * Builds a suggestions array from a QueyResult
   * @param {QueryResult} suggestionsDB - suggestions from DB
   * @param {number}  amount - amount of suggestion to be generated
   *
   * @return {Suggestion[]} processed suggestions
   */
  public static prepareDBSuggestions = (
    suggestionsDB: QueryResult
  ): Suggestion[] => {
    const suggestions: Suggestion[] = [];
    suggestionsDB.rows.forEach(suggestion => {
      suggestions.push(new Suggestion(suggestion.content));
    });
    return suggestions;
  };

  /**
   * Builds a suggestions array using a random seed (used for Lorem Picsum)
   * @param {string}  basepath - URL to be completed with a seed
   * @param {number}  amount - amount of suggestion to be generated
   *
   * @return {Suggestion[]} processed suggestions
   */
  public static prepareDBSuggestionWithSeed = (
    basepath: string,
    amount: number
  ): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    for (let i = 1; i <= amount; i++) {
      let url = fillInStrTemplate(basepath, [
        {
          param: 'seed',
          value: randomString(7)
        }
      ]);
      const content = { url: url };

      suggestions.push(new Suggestion(content));
    }
    return suggestions;
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
