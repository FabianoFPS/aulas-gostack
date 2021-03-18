"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireWildcard(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _classTransformer = require("class-transformer");

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let ListProvidersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RgUsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)(_ICacheProvider.ICacheProviderRegistri)(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProvidersService {
  constructor(userRepository, cacheProvider) {
    this.userRepository = userRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    user_id
  }) {
    let users = await this.cacheProvider.recover(`providers-list:${user_id}`);

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id
      });
      await this.cacheProvider.save(`providers-list:${user_id}`, (0, _classTransformer.classToClass)(users));
    }

    return users;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListProvidersService;
exports.default = _default;