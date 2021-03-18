"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmentRouter.use(_ensureAuthenticated.default);
appointmentRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date()
  }
}), appointmentsController.create);
appointmentRouter.get('/me', providerAppointmentsController.index);
var _default = appointmentRouter;
exports.default = _default;