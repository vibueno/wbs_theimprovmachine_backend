import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

import JsonPaths from '../types/JsonPaths';

class SuggestionCategory {
  private id: number;
  private title: string;
  private contenttype: string;
  private sourcetype: string;
  private basepath: string;
  private jsonpaths: JSON;
  private key: string;

  public static getDBCategory = async (
    categoryTitle: string
  ): Promise<QueryResult> => {
    const sqlQuery = `
    SELECT *
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
    basepath: string,
    jsonpaths: JSON,
    key: string
  ) {
    this.id = id;
    this.title = title;
    this.contenttype = contenttype;
    this.sourcetype = sourcetype;
    this.basepath = basepath;
    this.jsonpaths = jsonpaths;
    this.key = key;
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

  public getContentType = (): string => {
    return this.contenttype;
  };

  public getBasePath = (): string => {
    return this.basepath;
  };

  public getJsonPaths = (): JsonPaths => {
    const paths: JsonPaths = JSON.parse(JSON.stringify(this.jsonpaths));
    return paths;
  };

  public getKey = (): string => {
    return this.key;
  };
}

export default SuggestionCategory;
