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
import { buildResponse, buildResponseData } from '../utils/response';

import { isPositiveInt } from '../utils/validations';

/**
 * validates the query params of the get request. In case of invalidty, exceptions are thrown
 * @param {Request} req - Expects query params category:number and amount:number
 */
const validateQueryParams = (req: Request) => {
  const { category, amount } = req.body;

  // query param validations: category
  if (!category)
    throw buildResponse(
      httpResponse.badRequest,
      operationResult.fail,
      fillInStrTemplate(msgQueryParamMissing, [
        { param: 'paramName', value: 'category' }
      ])
    );

  // query param validations: amount
  if (!amount)
    throw buildResponse(
      httpResponse.badRequest,
      operationResult.fail,
      fillInStrTemplate(msgQueryParamMissing, [
        { param: 'paramName', value: 'amount' }
      ])
    );

  if (!isPositiveInt(amount))
    throw buildResponse(
      httpResponse.badRequest,
      operationResult.fail,
      fillInStrTemplate(msgQueryParamWrongFormat, [
        { param: 'paramName', value: 'amount' }
      ])
    );

  if (amount > maxSuggestionsPerRequest)
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
   * sends back a determined amount of suggestions of a specified category.
   * @async
   * @param {Request}   req - request object. Expects query params category:number and amount:number
   * @param {Response}  res - response object.
   */
  get: async (req: Request, res: Response) => {
    try {
      validateQueryParams(req);

      const categoryDB = await SuggestionCategory.getDBCategory(
        req.body.category
      );

      if (categoryDB.rowCount === 0)
        throw buildResponse(
          httpResponse.badRequest,
          operationResult.fail,
          msgCatNotFound
        );

      const categoryDBRow = categoryDB.rows[0];

      const category = new SuggestionCategory(
        categoryDBRow.id,
        categoryDBRow.title,
        categoryDBRow.contenttype,
        categoryDBRow.sourcetype,
        categoryDBRow.basepath,
        categoryDBRow.jsonpaths,
        categoryDBRow.key
      );

      switch (category.getSourceType()) {
        case categorySources.DB:
          const suggestionsDB = await SuggestionList.getDBSuggestions(
            category.getId(),
            req.body.amount
          );

          let suggestions = SuggestionList.createFromDBSuggestions(
            category,
            suggestionsDB
          ).getSuggestions();

          res.status(httpResponse.OK).json(
            buildResponse(
              httpResponse.OK,
              operationResult.success,
              fillInStrTemplate(msgSuggestionsFetched, [
                {
                  param: 'amount',
                  value: req.body.amount
                },
                {
                  param: 'suggestionCategoryTitle',
                  value: category.getTitle()
                }
              ]),
              buildResponseData(category, suggestions)
            )
          );

          break;
        case categorySources.API:
          const suggestionsAPI = await SuggestionList.getAPISuggestions(
            category,
            req.body.amount
          );

          const suggestionList = SuggestionList.createFromAPIresponse(
            category,
            suggestionsAPI
          );

          res.status(httpResponse.OK).json(
            buildResponse(
              httpResponse.OK,
              operationResult.success,
              fillInStrTemplate(msgSuggestionsFetched, [
                {
                  param: 'amount',
                  value: req.body.amount
                },
                {
                  param: 'suggestionCategoryTitle',
                  value: category.getTitle()
                }
              ]),
              buildResponseData(category, suggestionList.getSuggestions())
            )
          );
          break;
        default:
          throw buildResponse(
            httpResponse.badRequest,
            operationResult.fail,
            msgCatSrcInvalid
          );
      }
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
