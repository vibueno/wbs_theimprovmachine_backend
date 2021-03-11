/*
This class has been implemented using the design pattern Static Factory Methods
https://medium.com/codespace69/typescript-oop-constructor-overload-in-typescript-7b0ad53b5622
https://stackify.com/static-factory-methods/
 */

import pool from '../utils/db';
import { QueryConfig, QueryResult } from 'pg';
import * as jsonPath from 'jsonpath';

import Suggestion from '../models/Suggestion';
import SuggestionCategory from '../models/SuggestionCategory';

import { fillInStrTemplate, strTemplateHasParams } from '../utils/strtemplate';
import { apiRequest } from '../utils/api';
import { decrypt } from '../utils/encryption';
import { isNotNullNorUndefined } from '../utils/validations';

import JsonPaths from '../types/JsonPaths';
import ResponseSuggestion from '../types/ResponseSuggestion';

class SuggestionList {
  /**
   * Retrieves an amount of suggestions from a specified category from the DB.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   *
   * @return  Promise<QueryResult>
   */

  private category: SuggestionCategory;
  private suggestions: Suggestion[];

  private static getDBSuggestions = async (
    category: number,
    amount: number
  ): Promise<QueryResult> => {
    const sqlQuery = `
      SELECT sc.id, sc.name, sc.basepath, s.content
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
   * Retrieves an amount of suggestions from a specified category from an API.
   * @async
   * @static
   * @param   {number} category - suggestion category from which we want to get suggestions.
   * @param   {number} amount - amount of suggestions we want to get.
   *
   * @return  Promise<string>[]
   */

  private static getAPISuggestions = async (
    category: SuggestionCategory,
    amount: number
  ): Promise<string[]> => {
    const requests: Promise<string>[] = [];

    const basePath = category.getBasePath();
    const basePathHasKey = strTemplateHasParams(basePath);

    for (let i = 1; i <= amount; i++) {
      if (basePathHasKey) {
        // Double assignment needed to avoid compilation error
        let decriptedKey: string = '';
        decriptedKey = decrypt(category.getApiKey());
        requests.push(
          await apiRequest(
            fillInStrTemplate(category.getBasePath(), [
              { param: 'key', value: decriptedKey }
            ])
          )
        );
      } else requests.push(await apiRequest(basePath));
    }
    return await Promise.all(requests);
  };

  /**
   * Creates a suggestiosList from the DB.
   * @param  {SuggestionCategory}  category - category of the suggestions.
   * @param  {number} amount - amount of suggestions to get.
   *
   * @return Promise<SuggestionList> promise of the suggestion list from DB.
   */
  public static async createFromDB(
    category: SuggestionCategory,
    amount: number
  ): Promise<SuggestionList> {
    const suggestionsDB = await SuggestionList.getDBSuggestions(
      category.getId(),
      amount
    );

    const suggestions: Suggestion[] = [];
    suggestionsDB.rows.forEach(suggestion => {
      suggestions.push(new Suggestion(suggestion.content));
    });
    return new this(category, suggestions);
  }

  /**
   * Creates a suggestiosList from an API.
   * @param  {SuggestionCategory}  category - category of the suggestions.
   * @param  {number} amount - amount of suggestions to get.
   *
   * @return Promise<SuggestionList> promise of the suggestion list from API.
   */
  public static async createFromAPI(
    category: SuggestionCategory,
    amount: number
  ): Promise<SuggestionList> {
    const suggestionsAPI = await SuggestionList.getAPISuggestions(
      category,
      amount
    );

    let suggestions: Suggestion[] = [];

    const jsonpaths: JsonPaths = category.getJsonPaths();
    let suggestion: ResponseSuggestion = {};

    suggestionsAPI.forEach(suggestionAPI => {
      suggestion = {};

      Object.keys(jsonpaths).forEach(jsonpath => {
        if (jsonpaths[jsonpath].length > 1) {
          const values = jsonpaths[jsonpath].map(
            pathItem => jsonPath.query(suggestionAPI, pathItem)[0]
          );
          const value = values.find(value => isNotNullNorUndefined(value));
          suggestion[jsonpath] = value;
        } else
          suggestion[jsonpath] = jsonPath.query(
            suggestionAPI,
            jsonpaths[jsonpath][0]
          )[0];
      });
      suggestions.push(new Suggestion(suggestion));
    });

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
