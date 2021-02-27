import { httpNotFound, resOpFailure } from '../vars/constants.js';
import { msgPageNotFound } from '../vars/messages.js';
import buildResponse from '../utils/response.js';

const controller = {
  pageNotFound: (req, res) => {
    res
      .status(httpNotFound)
      .json(buildResponse(httpNotFound, resOpFailure, msgPageNotFound));
  }
};

export default controller;
