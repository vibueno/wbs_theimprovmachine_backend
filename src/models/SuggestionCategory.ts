import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

class SuggestionCategory {
  private title: string;
  private content: string;

  public static getTitle = async (id: Number): Promise<string> => {
    const sqlQuery = `
      SELECT sc.title
      FROM suggestioncategory sc
      WHERE sc.id = $1`;

    const query: QueryConfig = {
      text: sqlQuery,
      values: [id]
    };
    const suggestions: QueryResult = await pool.query(query);

    return new Promise<string>(resolve => {
      resolve(suggestions.rows[0].title);
    });
  };

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }

  getTitle = (): string => this.title;
  getContent = (): string => this.content;
}

export default SuggestionCategory;
