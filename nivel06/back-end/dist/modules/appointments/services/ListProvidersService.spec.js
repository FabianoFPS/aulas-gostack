"use strict";

var _FakeUserRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUserRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'um',
      email: 'um@tt.com',
      password: 'asdfgh'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'dois',
      email: 'dois@tt.com',
      password: 'qwerty'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@tt.com',
      password: 'zxcvbn'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});