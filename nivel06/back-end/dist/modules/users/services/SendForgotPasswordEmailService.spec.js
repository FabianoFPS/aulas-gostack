"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUserRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should de able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'jhon@deo.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-eixting user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'jhon@deo.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('shoul generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'jhon@deo.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});