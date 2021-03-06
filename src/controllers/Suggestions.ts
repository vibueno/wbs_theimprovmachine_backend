import { Request, Response } from 'express';

import SuggestionList from '../models/SuggestionList';
import SuggestionCategory from '../models/SuggestionCategory';
import { fillInStrTemplate } from '../utils/strtemplate';

import {
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgQueryParamMaxAmount,
  msgServerError,
  msgCatSrcInvalid,
  msgCatNotFound,
  msgSuggestionsFetched
} from '../vars/messages';

import {
  httpResponse,
  operationResult,
  categorySources,
  maxSuggestionsPerRequest
} from '../vars/constants';
import { buildResponse, buildSuggestionResponseData } from '../utils/response';

import { isPositiveInt } from '../utils/validations';

/**
 * validates the query params of the get request. In case of invalidty, exceptions are thrown
 * @param {Request} req - Expects query params category:number and amount:number
 */
const validateQueryParams = (req: Request) => {
  /* I didn't find a better approach for making it work
  but it truly isn't nice to cast as any
  */
  const queryCategory: any = req.query.category;
  const queryAmount: any = req.query.amount;

  // query param validations: category
  if (!queryCategory)
    throw buildResponse(
      httpResponse.badRequest,
      operationResult.fail,
      fillInStrTemplate(msgQueryParamMissing, [
        { param: 'paramName', value: 'category' }
      ])
    );

  // query param validations: amount
  if (!queryAmount)
    throw buildResponse(
      httpResponse.badRequest,
      operationResult.fail,
      fillInStrTemplate(msgQueryParamMissing, [
        { param: 'paramName', value: 'amount' }
      ])
    );

  if (!isPositiveInt(queryAmount.toString()))
    throw buildResponse(
      httpResponse.badRequest,
      operationResult.fail,
      fillInStrTemplate(msgQueryParamWrongFormat, [
        { param: 'paramName', value: 'amount' }
      ])
    );

  if (queryAmount > maxSuggestionsPerRequest)
    throw buildResponse(
      httpResponse.badRequest,
      operationResult.fail,
      fillInStrTemplate(msgQueryParamMaxAmount, [
        { param: 'maxAmount', value: maxSuggestionsPerRequest.toString() }
      ])
    );
};

const controller = {
  /**
   * Sends back the defined amount of suggestions from the specified category.
   * @async
   * @param {Request}   req - request object. Expects query params category:number and amount:number.
   * @param {Response}  res - response object.
   */
  get: async (req: Request, res: Response) => {
    try {
      validateQueryParams(req);

      /* I didn't find a better approach for making it work
      but it truly isn't nice to cast as any
      */
      const queryCategory: any = req.query.category;
      const queryAmount: any = req.query.amount;

      const categoryDB = await SuggestionCategory.getDBCategory(queryCategory);

      if (categoryDB.rowCount === 0)
        throw buildResponse(
          httpResponse.badRequest,
          operationResult.fail,
          msgCatNotFound
        );

      const categoryDBRow = categoryDB.rows[0];

      const category = new SuggestionCategory(
        categoryDBRow.id,
        categoryDBRow.name,
        categoryDBRow.title,
        categoryDBRow.description,
        categoryDBRow.contenttype,
        categoryDBRow.sourcetype,
        categoryDBRow.basepath,
        categoryDBRow.jsonpaths,
        categoryDBRow.apikey
      );

      let suggestionList;

      switch (category.getSourceType()) {
        case categorySources.DB:
          suggestionList = await SuggestionList.createFromDB(
            category,
            queryAmount
          );

          break;
        case categorySources.API:
          suggestionList = await SuggestionList.createFromAPI(
            category,
            queryAmount
          );

          break;
        default:
          throw buildResponse(
            httpResponse.badRequest,
            operationResult.fail,
            msgCatSrcInvalid
          );
      }

      res.status(httpResponse.OK).json(
        buildResponse(
          httpResponse.OK,
          operationResult.success,
          fillInStrTemplate(msgSuggestionsFetched, [
            {
              param: 'amount',
              value: queryAmount
            },
            {
              param: 'suggestionCategoryTitle',
              value: category.getTitle()
            }
          ]),
          buildSuggestionResponseData(category, suggestionList.getSuggestions())
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
