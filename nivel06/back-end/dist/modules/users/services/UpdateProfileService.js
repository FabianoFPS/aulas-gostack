"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RgUsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('RgHashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProfileService {
  constructor(userRepository, hashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    user_id,
    name,
    email,
    old_password = '',
    password
  }) {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new _AppError.default('User not found.');
    const userWithUpdateEmail = await this.userRepository.findByEmail(email);
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) throw new _AppError.default('E-mail already in use.');
    user.name = name;
    user.email = email;
    const checkOldPassword = old_password === '' ? false : await this.hashProvider.compareHash(old_password, user.password);
    if (password && !checkOldPassword) throw new _AppError.default('Old password does not match.');
    if (password && checkOldPassword) user.password = await this.hashProvider.generateHash(password);
    return this.userRepository.save(user);
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateProfileService;
exports.default = _default;