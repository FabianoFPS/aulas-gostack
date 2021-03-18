"use strict";

var _tsyringe = require("tsyringe");

var _RedisCacheProvider = _interopRequireDefault(require("./implementations/RedisCacheProvider"));

var _ICacheProvider = require("./models/ICacheProvider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  redis: _RedisCacheProvider.default
};

_tsyringe.container.registerSingleton(_ICacheProvider.ICacheProviderRegistri, providers.redis);