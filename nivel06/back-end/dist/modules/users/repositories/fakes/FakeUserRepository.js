"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _user = _interopRequireDefault(require("../../infra/typeorm/entities/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async findAllProviders({
    except_user_id
  }) {
    let {
      users
    } = this;
    if (except_user_id) users = this.users.filter(user => user.id !== except_user_id);
    return users;
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async create({
    name,
    email,
    password
  }) {
    const user = new _user.default();
    Object.assign(user, {
      id: (0, _uuid.v4)()
    }, {
      name,
      email,
      password
    });
    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    if (findIndex === -1) throw new Error('Usuário não encontrado');
    this.users[findIndex] = user;
    return this.users[findIndex];
  }

}

var _default = FakeUsersRepository;
exports.default = _default;