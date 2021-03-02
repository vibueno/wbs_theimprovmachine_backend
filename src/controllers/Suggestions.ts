import { Request, Response } from 'express';
import SuggestionTypeList from '../models/SuggestionTypeList';

import { httpOK, resOpSuccess } from '../vars/constants';
import buildResponse from '../utils/response';

const controller = {
  get: async (_req: Request, res: Response) => {
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
          suggestionTypeList.getSuggestions()
        )
      );
  }
};

export default controller;
