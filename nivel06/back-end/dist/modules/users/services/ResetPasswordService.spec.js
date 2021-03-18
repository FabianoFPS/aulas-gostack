"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let resetPassword;
let fakeHashProvider;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassword = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should de able to reset the password', async () => {
    const {
      id
    } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: '999999'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(id);
    const newPassword = '111111';
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      token,
      password: newPassword
    });
    const user = await fakeUsersRepository.findById(id);
    expect(generateHash).toHaveBeenCalledWith(newPassword);
    expect(user?.password).toBe(newPassword);
  });
  it('should not be able to reset the password non-existing token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: 'abcdef'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('nonj-existing-user');
    await expect(resetPassword.execute({
      token,
      password: 'abcdef'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should de able to reset the password if passed more than 2 hours', async () => {
    const {
      id
    } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: '999999'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(id);
    const newPassword = '111111';
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custonDate = new Date();
      return custonDate.setHours(custonDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      token,
      password: newPassword
    })).rejects.toBeInstanceOf(_AppError.default);
  }); // HashChangeEvent
  // 2h de expiração
  // usertoken inesistentes
  // user inexistemte
});