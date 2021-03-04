import { Request, Response } from 'express';
import Suggestion from '../models/Suggestion';
import SuggestionListDB from '../models/SuggestionListDB';
import SuggestionListAPI from '../models/SuggestionListAPI';
import SuggestionCategory from '../models/SuggestionCategory';
import { templateHasParams, fillInMsgTemplate } from '../utils/messagetemplate';
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

const controller = {
  /**
   * sends back a determined amount of suggestions of a specified category.
   * @async
   * @param {Request}   req - request object. Expects query params category:number and amount:number
   * @param {Response}  res - response object.
   */
  get: async (req: Request, res: Response) => {
    try {
      // query param validations: category
      if (!req.body.category)
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamMissing, [
            { param: 'paramName', value: 'category' }
          ])
        );

      if (!isPositiveInt(req.body.category))
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamWrongFormat, [
            { param: 'paramName', value: 'category' }
          ])
        );

      // query param validations: amount
      if (!req.body.amount)
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamMissing, [
            { param: 'paramName', value: 'amount' }
          ])
        );

      if (!isPositiveInt(req.body.amount))
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamWrongFormat, [
            { param: 'paramName', value: 'amount' }
          ])
        );

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
        const suggestionsDB = await SuggestionListDB.getDBSuggestions(
          req.body.category,
          req.body.amount
        );

        const suggestions: Suggestion[] = [];

        if (category.getBasePath()) {
          // We need to generate a seed

          if (templateHasParams(category.getBasePath())) {
            for (let i = 1; i <= req.body.amount; i++) {
              let url = fillInMsgTemplate(category.getBasePath(), [
                {
                  param: 'seed',
                  value: randomString(7)
                }
              ]);
              const content = { url: url };

              suggestions.push(new Suggestion(content));
            }
          }
          // We need to process suggestions from DB
        } else {
          suggestionsDB.rows.forEach(suggestion => {
            suggestions.push(new Suggestion(suggestion.content));
          });
        }
        let suggestionList = new SuggestionListDB(category, suggestions);

        res.status(httpOK).json(
          buildResponse(
            httpOK,
            resOpSuccess,
            fillInMsgTemplate(msgSuggestionsFetched, [
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
