/*
This class has been implemented using the design pattern Static Factory Methods
https://medium.com/codespace69/typescript-oop-constructor-overload-in-typescript-7b0ad53b5622
https://stackify.com/static-factory-methods/
 */

import pool from '../utils/db';
import { QueryConfig, QueryResult } from 'pg';

import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';

import { fillInStrTemplate } from '../utils/strtemplate';
import { randomString } from '../utils/random';
import { apiRequest } from '../utils/api';
import { decrypt } from '../utils/encryption';

class SuggestionList {
  /**
   * Retrieves a specified amount of suggestions from the specified category from the DB.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   *
   * @return  Promise<QueryResult>
   */

  private category: SuggestionCategory;
  private suggestions: Suggestion[];

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

    return suggestions;
  };

  /**
   * Retrieves a specified amount of suggestions from the specified category from an API.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   *
   * @return  Promise<string>[]
   */

  public static getAPISuggestions = async (
    category: SuggestionCategory,
    amount: number
  ): Promise<string[]> => {
    const requests: Promise<string>[] = [];

    for (let i = 1; i <= amount; i++)
      requests.push(
        await apiRequest(
          fillInStrTemplate(category.getBasePath(), [
            { param: 'key', value: decrypt(category.getKey()) }
          ])
        )
      );

    const responses = await Promise.all(requests);

    return responses;
  };

  /**
   * Builds a suggestions array from a QueyResult
   * @param {QueryResult} suggestionsDB - suggestions from DB
   * @param {number}  amount - amount of suggestion to be generated
   *
   * @return {Suggestion[]} processed suggestions
   */
  public static createFromDBSuggestions(
    category: SuggestionCategory,
    suggestionsDB: QueryResult
  ): SuggestionList {
    const suggestions: Suggestion[] = [];
    suggestionsDB.rows.forEach(suggestion => {
      suggestions.push(new Suggestion(suggestion.content));
    });
    return new this(category, suggestions);
  }

  /**
   * Builds a suggestions array using a random seed (used for Lorem Picsum)
   * @param {string}  basepath - URL to be completed with a seed
   * @param {number}  amount - amount of suggestion to be generated
   *
   * @return {Suggestion[]} processed suggestions
   */
  public static createFromSeed(
    category: SuggestionCategory,
    amount: number
  ): SuggestionList {
    const suggestions: Suggestion[] = [];

    for (let i = 1; i <= amount; i++) {
      let url = fillInStrTemplate(category.getBasePath(), [
        //TODO: create interface
        {
          param: 'seed',
          value: randomString(7)
        }
      ]);
      suggestions.push(new Suggestion({ url: url }));
    }
    return new this(category, suggestions);
  }

  constructor(category: SuggestionCategory, suggestions: Suggestion[]) {
    (this.category = category), (this.suggestions = suggestions);
  }

  public getCategory = (): SuggestionCategory => {
    return this.category;
  };

  public getSuggestions = (): Suggestion[] => {
    return this.suggestions;
  };
}

export default SuggestionList;
