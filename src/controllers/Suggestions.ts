import { Request, Response } from 'express';
import SuggestionListAPI from '../models/SuggestionListAPI';
import SuggestionCategory from '../models/SuggestionCategory';
import { fillInMsgTemplate } from '../utils/messagetemplate';
import {
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgServerError,
  msgSuggestionsFetched
} from '../vars/messages';

import {
  httpOK,
  httpBadRequest,
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

      /*
      TODO: check whether we are dealing with DB or an API request
            and create the appropriate class
      */

      let suggestionList = new SuggestionListAPI(
        req.body.category,
        await SuggestionListAPI.getAPISuggestions(
          req.body.category,
          req.body.amount
        )
      );
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
              value: await SuggestionCategory.getTitle(req.body.category)
            }
          ]),
          suggestionList.getSuggestions()
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
