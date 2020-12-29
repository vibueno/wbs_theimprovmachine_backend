const { httpNotFound, resOpFailure } = require('../vars/constants');
const { msgPageNotFound } = require('../vars/messages');

const buildResponse = require('../utils/response');

const appController = {
  pageNotFound: (req, res) => {
    res
      .status(httpNotFound)
      .json(buildResponse(httpNotFound, resOpFailure, msgPageNotFound));
  }
};

module.exports = appController;
