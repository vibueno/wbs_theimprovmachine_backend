const { httpNotFound, resOpFailure } = require('../vars/constants');
const { msgPageNotFound } = require('../vars/messages');

const controller = {
  pageNotFound: (req, res) => {
    const buildResponse = require('../utils/response');

    res
      .status(httpNotFound)
      .json(buildResponse(httpNotFound, resOpFailure, msgPageNotFound));
  }
};

module.exports = controller;
