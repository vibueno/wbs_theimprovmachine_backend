import { QueryConfig, QueryResult } from 'pg';

import SuggestionCategory from '../models/SuggestionCategory';

import pool from '../utils/db';

class SuggestionCategoryList {
  private category: number;
  private suggestions: SuggestionCategory[];

  public static getDBSuggestions = async (
    category: number,
    amount: number
  ): Promise<QueryResult> => {
    const sqlQuery = `
      SELECT s.title, CONCAT(sc.basepath, s.content) as content
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
      suggestion => new SuggestionCategory(suggestion.title, suggestion.content)
    );
  }

  getType = (): number => {
    return this.category;
  };

  getSuggestions = (): SuggestionCategory[] => {
    return this.suggestions;
  };
}

export default SuggestionCategoryList;
