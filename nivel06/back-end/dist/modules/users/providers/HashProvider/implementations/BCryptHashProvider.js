"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

const SALT = 8;

class BCryptHashProvider {
  async generateHash(payload) {
    return (0, _bcryptjs.hash)(payload, SALT);
  }

  async compareHash(payload, hashed) {
    return (0, _bcryptjs.compare)(payload, hashed);
  }

}

exports.default = BCryptHashProvider;