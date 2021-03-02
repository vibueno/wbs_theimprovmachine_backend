import { Request, Response } from 'express';
import SuggestionTypeList from '../models/SuggestionTypeList';
import fillInMsgTemplate from '../utils/messagetemplate';
import {
  msgQueryParamMissing,
  msgQueryParamWrongFormat,
  msgServerError
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
      res
        .status(httpOK)
        .json(
          buildResponse(
            httpOK,
            resOpSuccess,
            'Here your suggestion',
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
