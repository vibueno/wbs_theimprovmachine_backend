import { Request, Response } from 'express';
import SuggestionType from '../models/SuggestionType';
import SuggestionTypeList from '../models/SuggestionTypeList';
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
   * returns a suggestion
   * @async
   * @param  req  request object of the middleware.
   *              Expects query params type:number and amount:number
   * @param  res  response object of the middleware
   * @return      req.body.amount suggestions of type req.body.type
   */
  get: async (req: Request, res: Response) => {
    try {
      if (!req.body.type)
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamMissing, { paramName: 'type' })
        );

      if (!isPositiveInt(req.body.type))
        throw buildResponse(
          httpBadRequest,
          resOpFailure,
          fillInMsgTemplate(msgQueryParamWrongFormat, {
            paramName: 'type'
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

      let suggestionTypeList = new SuggestionTypeList(
        1,
        await SuggestionTypeList.getDBSuggestions(
          req.body.type,
          req.body.amount
        )
      );
      res.status(httpOK).json(
        buildResponse(
          httpOK,
          resOpSuccess,
          fillInMsgTemplate(msgSuggestionsFetched, {
            amount: req.body.amount,
            typeTitle: await SuggestionType.getTitle(req.body.type)
          }),
          suggestionTypeList.getSuggestions()
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
