"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderMonthAvailabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvailabilityController"));

var _ProviderDayAvailabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvailabilityController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providerRouter = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providerMonthAvailabiblityController = new _ProviderMonthAvailabilityController.default();
const providerDayAvailabiblityController = new _ProviderDayAvailabilityController.default();
providerRouter.use(_ensureAuthenticated.default);
providerRouter.get('/', providersController.index);
providerRouter.get('/:provider_id/month-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerMonthAvailabiblityController.index);
providerRouter.get('/:provider_id/day-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerDayAvailabiblityController.index);
var _default = providerRouter;
exports.default = _default;