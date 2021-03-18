"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createUser;
describe('CreateUser', () => {
  beforeEach(() => {
    createUser = new _CreateUserService.default(new _FakeUserRepository.default(), new _FakeHashProvider.default(), new _FakeCacheProvider.default());
  });
  it('should de able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not de able to create a new user with same email from another', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef'
    };
    await createUser.execute(newUser);
    expect(createUser.execute(newUser)).rejects.toBeInstanceOf(_AppError.default);
  });
});