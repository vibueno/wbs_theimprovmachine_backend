import { QueryConfig, QueryResult } from 'pg';

import Suggestion from '../models/Suggestion';

import pool from '../utils/db';

class SuggestionList {
  private category: number;
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

    return new Promise<QueryResult>(resolve => {
      resolve(suggestions);
    });
  };

  constructor(category: number, suggestions: QueryResult) {
    this.category = category;

    this.suggestions = suggestions.rows.map(
      suggestion => new Suggestion(suggestion.title, suggestion.content)
    );
  }

  getSuggestionCategory = (): number => {
    return this.category;
  };

  getSuggestions = (): Suggestion[] => {
    return this.suggestions;
  };
}

export default SuggestionList;
