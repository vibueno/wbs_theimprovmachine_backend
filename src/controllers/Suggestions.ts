import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import Suggestion from '../models/Suggestion';
import SuggestionList from '../models/SuggestionList';
import SuggestionCategory from '../models/SuggestionCategory';
import { strTemplateHasParams, fillInStrTemplate } from '../utils/strtemplate';
import { randomString } from '../utils/random';

import {
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgServerError,
  msgCatSrcNotImplemented,
  msgSuggestionsFetched
} from '../vars/messages';

import {
  httpOK,
  httpBadRequest,
  httpNotFound,
  httpServerError,
  resOpSuccess,
  resOpFailure
} from '../vars/constants';
import buildResponse from '../utils/response';

import { isPositiveInt } from '../utils/validations';

/**
 * validates the query params of the get request. In case of invalidty, exceptions are thrown
 * @param {Request} req - request object. Expects query params category:number and amount:number
 */
const validateQueryParams = (req: Request) => {
  const { category, amount } = req.body;

  if (!category)
    throw buildResponse(
      httpBadRequest,
      resOpFailure,
      fillInStrTemplate(msgQueryParamMissing, [
        { param: 'paramName', value: 'category' }
      ])
    );

  if (!isPositiveInt(category))
    throw buildResponse(
      httpBadRequest,
      resOpFailure,
      fillInStrTemplate(msgQueryParamWrongFormat, [
        { param: 'paramName', value: 'category' }
      ])
    );

  // query param validations: amount
  if (!amount)
    throw buildResponse(
      httpBadRequest,
      resOpFailure,
      fillInStrTemplate(msgQueryParamMissing, [
        { param: 'paramName', value: 'amount' }
      ])
    );

  if (!isPositiveInt(amount))
    throw buildResponse(
      httpBadRequest,
      resOpFailure,
      fillInStrTemplate(msgQueryParamWrongFormat, [
        { param: 'paramName', value: 'amount' }
      ])
    );
};

/**
 * Builds a suggestions array using a random seed (used for Lorem Picsum)
 * @param {string}  basepath - URL to be completed with a seed
 * @param {number}  amount - amount of suggestion to be generated
 *
 * @return {Suggestion[]} suggestions
 */
const processDBSuggestionReqSeed = (
  basepath: string,
  amount: number
): Suggestion[] => {
  const suggestions: Suggestion[] = [];

  for (let i = 1; i <= amount; i++) {
    let url = fillInStrTemplate(basepath, [
      {
        param: 'seed',
        value: randomString(7)
      }
    ]);
    const content = { url: url };

    suggestions.push(new Suggestion(content));
  }
  return suggestions;
};

const processDBSuggestionReq = (suggestionsDB: QueryResult): Suggestion[] => {
  const suggestions: Suggestion[] = [];
  suggestionsDB.rows.forEach(suggestion => {
    suggestions.push(new Suggestion(suggestion.content));
  });
  return suggestions;
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

      const category = new SuggestionCategory(
        categoryDB.rows[0].id,
        categoryDB.rows[0].title,
        categoryDB.rows[0].contenttype,
        categoryDB.rows[0].sourcetype,
        categoryDB.rows[0].basepath
      );

      if (category.getSourceType() === 'DB') {
        const suggestionsDB = await SuggestionList.getDBSuggestions(
          req.body.category,
          req.body.amount
        );

        let suggestions: Suggestion[] = [];

        if (category.getBasePath()) {
          if (strTemplateHasParams(category.getBasePath())) {
            // We need to generate a seed
            suggestions = processDBSuggestionReqSeed(
              category.getBasePath(),
              req.body.amount
            );
          }
          // We need to process suggestions from DB
        } else {
          suggestions = processDBSuggestionReq(suggestionsDB);
        }

        let suggestionList = new SuggestionList(category, suggestions);

        res.status(httpOK).json(
          buildResponse(
            httpOK,
            resOpSuccess,
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
            suggestionList.getSuggestions()
          )
        );
      } else
        res
          .status(httpServerError)
          .json(
            buildResponse(
              httpNotFound,
              resOpSuccess,
              msgCatSrcNotImplemented,
              []
            )
          );
    } catch (e) {
      console.error(Error(e.message));
      if (e.status) res.status(e.status).json(e);
      else {
        res
          .status(httpServerError)
          .json(
            buildResponse(
              httpServerError,
              resOpFailure,
              msgServerError,
              e.message
            )
          );
      }
    }
  }
};

export default controller;
