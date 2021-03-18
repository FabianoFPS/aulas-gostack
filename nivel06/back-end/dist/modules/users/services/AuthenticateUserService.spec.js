"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUseresRepository;
let fakeHashProvider;
let createUser;
let authenticateUser;
let fakeCacheProvider;
describe('AuthenticateUser', () => {
  beforeAll(() => {
    fakeUseresRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUseresRepository, fakeHashProvider, fakeCacheProvider);
    authenticateUser = new _AuthenticateUserService.default(fakeUseresRepository, fakeHashProvider);
  });
  it('should de able to authenticate', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef'
    };
    const user = await createUser.execute(newUser);
    const {
      email,
      password
    } = newUser;
    const response = await authenticateUser.execute({
      email,
      password
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not de able to authenticate with non existing user', async () => {
    const user = {
      email: '_jhon@deo.com',
      password: 'abcdef'
    };
    await expect(authenticateUser.execute(user)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not de able to authenticate with wrong password', async () => {
    const newUser = {
      name: 'John Doe',
      email: '2jhon@deo.com',
      password: 'abcdef'
    };
    const user = await createUser.execute(newUser);
    const {
      email
    } = user;
    await expect(authenticateUser.execute({
      email,
      password: 'asdf'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});