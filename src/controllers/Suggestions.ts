import { Request, Response } from 'express';
import SuggestionTypeList from '../models/SuggestionTypeList';

import {
  httpOK,
  httpNotFound,
  resOpSuccess,
  resOpFailure
} from '../vars/constants';
import { msgPageNotFound } from '../vars/messages';
import buildResponse from '../utils/response';

const controller = {
  get: async (req: Request, res: Response) => {
    let suggestionTypeList = new SuggestionTypeList(
      1,
      await SuggestionTypeList.getDBSuggestions(2, 2)
    );
    res
      .status(httpOK)
      .json(
        buildResponse(
          httpOK,
          resOpSuccess,
          'Here your suggestion',
          suggestionTypeList.getSuggestions().rows
        )
      );
  }
};

export default controller;
