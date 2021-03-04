import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

class SuggestionCategory {
  private id: number;
  private title: string;
  private contenttype: string;
  private sourcetype: string;
  private basepath: string;

  public static getDBCategory = async (
    categoryid: number
  ): Promise<QueryResult> => {
    const sqlQuery = `
    SELECT sc.id, sc.title, sc.contenttype, sc.sourcetype, sc.basepath
    FROM suggestioncategory sc
    WHERE sc.id = $1`;

    const query: QueryConfig = {
      text: sqlQuery,
      values: [categoryid]
    };
    const category: QueryResult = await pool.query(query);

    return new Promise<QueryResult>(resolve => {
      resolve(category);
    });
  };

  constructor(
    id: number,
    title: string,
    contenttype: string,
    sourcetype: string,
    basepath: string
  ) {
    this.id = id;
    this.title = title;
    this.contenttype = contenttype;
    this.sourcetype = sourcetype;
    this.basepath = basepath;
  }

  public getTitle = (): string => {
    return this.title;
  };

  public getSourceType = (): string => {
    return this.sourcetype;
  };
}

export default SuggestionCategory;
