"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _user = _interopRequireDefault(require("../entities/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_user.default);
  }

  async findAllProviders({
    except_user_id
  }) {
    if (except_user_id) return this.ormRepository.find({
      where: {
        id: (0, _typeorm.Not)(except_user_id)
      }
    });
    return this.ormRepository.find();
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async create({
    name,
    email,
    password
  }) {
    const user = await this.ormRepository.create({
      name,
      email,
      password
    });
    return this.ormRepository.save(user);
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UsersRepository;
exports.default = _default;