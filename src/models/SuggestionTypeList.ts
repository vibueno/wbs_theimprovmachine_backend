import { QueryConfig, QueryResult } from 'pg';

import SuggestionType from '../models/SuggestionType';

import pool from '../utils/db';

class SuggestionTypeList {
  private type: number;
  private suggestions: SuggestionType[];

  public static getDBSuggestions = async (
    type: number,
    amount: number
  ): Promise<QueryResult> => {
    const sqlQuery = `
      SELECT sti.title, CONCAT(st.basepath, sti.content) as content
      FROM suggestiontypeitem sti
      JOIN suggestiontype st ON sti.suggestiontypeid = $1
      WHERE st.id = sti.suggestiontypeid
      ORDER BY RANDOM()
      LIMIT $2;`;

    const query: QueryConfig = {
      text: sqlQuery,
      values: [type, amount]
    };
    const suggestions: QueryResult = await pool.query(query);

    return new Promise<QueryResult>(resolve => {
      resolve(suggestions);
    });
  };

  constructor(type: number, suggestions: QueryResult) {
    this.type = type;

    this.suggestions = suggestions.rows.map(
      suggestion => new SuggestionType(suggestion.title, suggestion.content)
    );
  }

  getType = (): number => {
    return this.type;
  };

  getSuggestions = (): SuggestionType[] => {
    return this.suggestions;
  };
}

export default SuggestionTypeList;
