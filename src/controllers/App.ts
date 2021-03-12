import { Request, Response } from 'express';

import { httpResponse, operationResult } from '../vars/constants';
import { msgPageNotFound } from '../vars/messages';
import { buildResponse } from '../utils/response';

const controller = {
  pageNotFound: (_req: Request, res: Response) => {
    res
      .status(httpResponse.notFound)
      .json(
        buildResponse(
          httpResponse.notFound,
          operationResult.fail,
          msgPageNotFound
        )
      );
  }
};

export default controller;
