import { Request, Response } from 'express';

import Suggestion from '../models/Suggestion';
import SuggestionList from '../models/SuggestionList';
import SuggestionCategory from '../models/SuggestionCategory';
import { strTemplateHasParams, fillInStrTemplate } from '../utils/strtemplate';

import {
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgServerError,
  msgCatSrcNotImplemented,
  msgCatSrcInvalid,
  msgCatNotFound,
  msgSuggestionsFetched
} from '../vars/messages';

import {
  httpResponse,
  operationResult,
  categorySources
} from '../vars/constants';
import buildResponse from '../utils/response';

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
        categoryDBRow.basepath
      );

      switch (category.getSourceType()) {
        case categorySources.DB:
          const suggestionsDB = await SuggestionList.getDBSuggestions(
            category.getId(),
            req.body.amount
          );

          let suggestions: Suggestion[] = [];

          const basepath = category.getBasePath();

          if (basepath) {
            if (strTemplateHasParams(basepath)) {
              const suggestionList = SuggestionList.createFromSeed(
                category,
                req.body.amount
              );
              suggestions = suggestionList.getSuggestions();
            }
          } else {
            const suggestionList = SuggestionList.createFromDBSuggestions(
              category,
              suggestionsDB
            );
            suggestions = suggestionList.getSuggestions();
          }

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
              suggestions
            )
          );
          break;
        case categorySources.API:
          res
            .status(httpResponse.serverError)
            .json(
              buildResponse(
                httpResponse.notFound,
                operationResult.success,
                msgCatSrcNotImplemented,
                []
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
