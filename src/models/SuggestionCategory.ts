import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

import JsonPaths from '../types/JsonPaths';

class SuggestionCategory {
  private id: number;
  private name: string;
  private title: string;
  private description: string;
  private contenttype: string;
  private sourcetype: string;
  private basepath: string;
  private jsonpaths: JSON;
  private apikey: string;

  public static getDBCategory = async (
    categoryTitle: string
  ): Promise<QueryResult> => {
    const sqlQuery = `
    SELECT *
    FROM suggestioncategory sc
    WHERE sc.name = $1`;

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
    name: string,
    title: string,
    description: string,
    contenttype: string,
    sourcetype: string,
    basepath: string,
    jsonpaths: JSON,
    apikey: string
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.description = description;
    this.contenttype = contenttype;
    this.sourcetype = sourcetype;
    this.basepath = basepath;
    this.jsonpaths = jsonpaths;
    this.apikey = apikey;
  }

  public getId = (): number => {
    return this.id;
  };

  public getName = (): string => {
    return this.name;
  };

  public getTitle = (): string => {
    return this.title;
  };

  public getDescription = (): string => {
    return this.description;
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

  public getApiKey = (): string => {
    return this.apikey;
  };
}

export default SuggestionCategory;
