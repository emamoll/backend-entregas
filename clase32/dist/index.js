"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _config = _interopRequireDefault(require("./config"));

var _db = require("./services/db");

var _server = _interopRequireDefault(require("./services/server"));

var _arguments = require("./arguments");

var _winston = _interopRequireDefault(require("winston"));

var _cluster = _interopRequireDefault(require("cluster"));

var puerto = _arguments.args._[0] || _arguments.args.puerto;
var createLogger = _winston["default"].createLogger,
    format = _winston["default"].format,
    transports = _winston["default"].transports;
var combine = format.combine,
    printf = format.printf,
    timestamp = format.timestamp,
    colorize = format.colorize;
var logConfiguration = {
  level: "info",
  format: combine(timestamp({
    format: "DD-MMM-YYYY HH:mm:ss"
  }), colorize(), printf(function (info) {
    return "".concat(info.level, " | ").concat([info.timestamp], " | ").concat(info.message);
  })),
  transports: [new _winston["default"].transports.Console(), new _winston["default"].transports.File({
    filename: "./logs/warn.log",
    level: "warn"
  }), new _winston["default"].transports.File({
    filename: "./logs/error.log",
    level: "error"
  })]
};

var logger = _winston["default"].createLogger(logConfiguration);

exports.logger = logger;

var init = function init() {
  (0, _db.connectDb)();

  var server = _server["default"].listen(puerto, function () {
    return logger.info("Escuchando en puerto ".concat(puerto, " - PID Worker ").concat(process.pid));
  });

  server.on("error", function (err) {
    return logger.error("Error en el servidor: ".concat(err));
  });
};

init();