"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

var _debug = require("debug");

var _routes = _interopRequireDefault(require("./routes"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _rateLimiter = _interopRequireDefault(require("../middlewares/rateLimiter"));

require("../typeorm");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use('/files', _express.default.static(_upload.default.uploadFolder));
app.use(_rateLimiter.default);
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((err, request, response, _next) => {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  (0, _debug.log)(err);
  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  });
});
app.listen(3333, () => {
  (0, _debug.log)('Server start on port 3333!');
});