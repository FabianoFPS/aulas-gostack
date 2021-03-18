"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let showProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    showProfile = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef'
    });
    const profile = await showProfile.execute({
      user_id: user.id
    });
    expect(profile.name).toBe(user.name);
    expect(profile.email).toBe(user.email);
  });
  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-user'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});