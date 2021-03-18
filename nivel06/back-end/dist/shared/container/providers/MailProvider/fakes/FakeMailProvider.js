"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailPorvider {
  constructor() {
    this.messages = [];
  }

  async sendMail(message) {
    this.messages.push(message);
  }

}

exports.default = FakeMailPorvider;