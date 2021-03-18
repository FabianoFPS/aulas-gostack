"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: 'redis',
  config: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASS || undefined
  }
};
exports.default = _default;