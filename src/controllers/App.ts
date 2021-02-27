import { Request, Response } from 'express';

import { httpNotFound, resOpFailure } from '../vars/constants';
import { msgPageNotFound } from '../vars/messages';
import buildResponse from '../utils/response';

const controller = {
  pageNotFound: (req: Request, res: Response) => {
    res
      .status(httpNotFound)
      .json(buildResponse(httpNotFound, resOpFailure, msgPageNotFound));
  }
};

export default controller;
