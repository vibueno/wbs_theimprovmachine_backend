import { QueryConfig, QueryResult } from 'pg';

import Suggestion from '../models/Suggestion';
import SuggestionList from '../models/SuggestionList';

import pool from '../utils/db';

import { templateHasParams, fillInMsgTemplate } from '../utils/messagetemplate';

import { randomString } from '../utils/random';

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
  ): Promise<{ picture: string }[]> => {
    const sqlQuery = `
      SELECT sc.id, sc.title, sc.basepath
      FROM suggestioncategory sc
      WHERE sc.id = $1`;

    const query: QueryConfig = {
      text: sqlQuery,
      values: [category]
    };

    const suggestionsCategoryInfo: QueryResult = await pool.query(query);

    const basepath = suggestionsCategoryInfo.rows[0].basepath;

    if (templateHasParams(basepath)) {
      let answer: { picture: string }[] = [];

      for (let i = 0; i < amount; i++)
        answer[i] = {
          picture: fillInMsgTemplate(basepath, [
            {
              param: 'seed',
              value: randomString(5)
            }
          ])
        };

      return answer;
    } else {
      return [{ picture: 'no picture' }];
    }
  };

  constructor(category: number, suggestionsAPI: { picture: string }[]) {
    super(
      category,
      suggestionsAPI.map(
        suggestion => new Suggestion('picture', suggestion.picture)
      )
    );
  }
}

export default SuggestionListAPI;
