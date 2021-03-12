import { Request, Response } from 'express';

import SuggestionCategoryList from '../models/SuggestionCategoryList';
import { fillInStrTemplate } from '../utils/strtemplate';

import {
  msgServerError,
  msgSuggestionCategoriesFetched
} from '../vars/messages';

import { httpResponse, operationResult } from '../vars/constants';
import {
  buildResponse,
  buildSuggestionCategoriesResponseData
} from '../utils/response';

const controller = {
  /**
   * Sends back the defined amount of suggestions from the specified category.
   * @async
   * @param {Request}   req - request object. Expects query params category:number and amount:number.
   * @param {Response}  res - response object.
   */
  get: async (_req: Request, res: Response) => {
    try {
      const suggestionCategoryList = await SuggestionCategoryList.create();
      const suggestionCategories = suggestionCategoryList.getAll();

      res.status(httpResponse.OK).json(
        buildResponse(
          httpResponse.OK,
          operationResult.success,
          fillInStrTemplate(msgSuggestionCategoriesFetched, [
            {
              param: 'amount',
              value: suggestionCategories.length.toString()
            }
          ]),
          buildSuggestionCategoriesResponseData(suggestionCategoryList.getAll())
        )
      );
    } catch (e) {
      console.error(Error(e.message));
      if (e.status) res.status(e.status).json(e);
      else {
        res
          .status(httpResponse.serverError)
          .json(
            buildResponse(
              httpResponse.serverError,
              operationResult.fail,
              msgServerError,
              e.message
            )
          );
      }
    }
  }
};

export default controller;
