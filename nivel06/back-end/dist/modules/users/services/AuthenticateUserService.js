"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RgUsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('RgHashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AuthenticateUserService {
  constructor(userRepository, hashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new _AppError.default('Incorrect email/password combination.', 401);
    const passwordmatched = await this.hashProvider.compareHash(password, user.password);
    if (!passwordmatched) throw new _AppError.default('Incorrect email/password combination.', 401);
    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    if (!secret) throw new _AppError.default('Invalid secret');
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: user.id,
      expiresIn
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = AuthenticateUserService;
exports.default = _default;