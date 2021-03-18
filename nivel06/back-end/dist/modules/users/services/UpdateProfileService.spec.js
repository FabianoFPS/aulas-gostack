"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider); // afterEach(() => {
    // });
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef'
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johontre@camp.com'
    });
    expect(updateUser.name).toBe('John Tre');
    expect(updateUser.email).toBe('johontre@camp.com');
  });
  it('should not be able update the profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user',
      name: 'tes',
      email: 'test@test.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef'
    });
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'test@deo.com',
      password: 'abcdef'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'jhon@deo.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const pass = 'abcdef';
    const newPass = 'awdkg';
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: '3jhon@deo.com',
      password: pass
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: '4johontre@camp.com',
      old_password: pass,
      password: newPass
    });
    expect(updateUser.password).toBe(newPass);
  });
  it('should not be able to update the password without old Passowrd', async () => {
    const pass = 'abcdef';
    const newPass = 'awdkg';
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: '3jhon@deo.com',
      password: pass
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: '4johontre@camp.com',
      password: newPass
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old Passowrd', async () => {
    const pass = 'abcdef';
    const newPass = 'awdkg';
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: '7jhon@deo.com',
      password: pass
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: '5johontre@camp.com',
      password: newPass,
      old_password: 'wrongoldPassowrd'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});