import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

class SuggestionCategory {
  /**
   * Returns  the title of a suggestion category
   * @async
   * @param   id  id of the suggestion category whose title is being looked up
   * @return  suggestion category title
   */
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
}

export default SuggestionCategory;
