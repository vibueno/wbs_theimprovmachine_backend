import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

class SuggestionType {
  private title: string;
  private content: string;

  public static getTitle = async (id: Number): Promise<string> => {
    const sqlQuery = `
      SELECT st.title
      FROM suggestiontype st
      WHERE st.id = $1`;

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

export default SuggestionType;
