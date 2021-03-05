import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

class SuggestionCategory {
  private id: number;
  private title: string;
  private contenttype: string;
  private sourcetype: string;
  private basepath: string;

  public static getDBCategory = async (
    categoryTitle: string
  ): Promise<QueryResult> => {
    const sqlQuery = `
    SELECT sc.id, sc.title, sc.contenttype, sc.sourcetype, sc.basepath
    FROM suggestioncategory sc
    WHERE sc.title = $1`;

    const query: QueryConfig = {
      text: sqlQuery,
      values: [categoryTitle]
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

  public getId = (): number => {
    return this.id;
  };

  public getTitle = (): string => {
    return this.title;
  };

  public getSourceType = (): string => {
    return this.sourcetype;
  };

  public getBasePath = (): string => {
    return this.basepath;
  };
}

export default SuggestionCategory;
