"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = void 0;

var _ = require("..");

var isLoggedIn = function isLoggedIn(req, res, done) {
  _.logger.warn("Is authenticated");

  _.logger.warn(req.isAuthenticated());

  if (!req.isAuthenticated()) {
    _.logger.error('No estas autorizado');

    return res.status(401).json({
      message: "No estas autorizado"
    });
  } else done();
};

exports.isLoggedIn = isLoggedIn;