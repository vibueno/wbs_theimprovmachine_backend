import { QueryConfig, QueryResult } from 'pg';

import pool from '../utils/db';

import SuggestionCategory from './SuggestionCategory';

class SuggestionCategoryList {
  private suggestionCategories: SuggestionCategory[];

  constructor(suggestionCategories: SuggestionCategory[]) {
    this.suggestionCategories = suggestionCategories;
  }

  public static getDBCategories = async (): Promise<QueryResult> => {
    const sqlQuery = `
    SELECT *
    FROM suggestioncategory sc`;

    const query: QueryConfig = {
      text: sqlQuery
    };
    const categories: QueryResult = await pool.query(query);

    return new Promise<QueryResult>(resolve => {
      resolve(categories);
    });
  };

  public static async create(): Promise<SuggestionCategoryList> {
    const suggestionCategoriesDB = await SuggestionCategoryList.getDBCategories();

    const suggestionCategories: SuggestionCategory[] = [];
    suggestionCategoriesDB.rows.forEach(suggestionCategory => {
      suggestionCategories.push(
        new SuggestionCategory(
          suggestionCategory.id,
          suggestionCategory.title,
          suggestionCategory.description,
          suggestionCategory.contenttype,
          suggestionCategory.sourcetype,
          suggestionCategory.basepath,
          suggestionCategory.jsonpaths,
          suggestionCategory.key
        )
      );
    });
    return new this(suggestionCategories);
  }

  public getAll = (): SuggestionCategory[] => {
    return this.suggestionCategories;
  };
}

export default SuggestionCategoryList;
