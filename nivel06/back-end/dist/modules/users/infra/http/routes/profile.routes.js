"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _ProfileController = _interopRequireDefault(require("../controllers/ProfileController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const profileController = new _ProfileController.default();
profileRouter.use(_ensureAuthenticated.default);
profileRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    old_password: _celebrate.Joi.string(),
    password: _celebrate.Joi.when('oldPassword', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.required()
    }),
    password_confirmation: _celebrate.Joi.when('password', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.valid(_celebrate.Joi.ref('password')).required()
    })
  }
}), profileController.update);
profileRouter.get('/', profileController.show);
var _default = profileRouter;
exports.default = _default;