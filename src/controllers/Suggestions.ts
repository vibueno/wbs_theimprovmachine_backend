import { Request, Response } from 'express';
import SuggestionList from '../models/SuggestionList';
import SuggestionCategory from '../models/SuggestionCategory';
import fillInMsgTemplate from '../utils/messagetemplate';
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

import isPositiveInt from '../utils/validations';

const controller = {
  /**
   * returns a determined amount of suggestions of a specified category
   * @async
   * @param  req  request object of the middleware.
   *              Expects query params :number and amount:number
   * @param  res  response object of the middleware
   * @return      req.body.amount suggestions of category req.body.category
   */
  get: async (req: Request, res: Response) => {
    try {
      if (!req.body.category)
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamMissing, { paramName: 'category' })
        );

      if (!isPositiveInt(req.body.category))
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamWrongFormat, {
            paramName: 'category'
          })
        );

      if (!req.body.amount)
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamMissing, { paramName: 'amount' })
        );

      if (!isPositiveInt(req.body.amount))
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamWrongFormat, {
            paramName: 'amount'
          })
        );

      let suggestionList = new SuggestionList(
        req.body.category,
        await SuggestionList.getDBSuggestions(
          req.body.category,
          req.body.amount
        )
      );
      res.status(httpOK).json(
        buildResponse(
          httpOK,
          resOpSuccess,
          fillInMsgTemplate(msgSuggestionsFetched, {
            amount: req.body.amount,
            suggestionCategoryTitle: await SuggestionCategory.getTitle(
              req.body.category
            )
          }),
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
