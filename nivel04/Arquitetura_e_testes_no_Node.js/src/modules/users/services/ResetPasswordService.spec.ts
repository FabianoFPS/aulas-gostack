// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });
  it('should de able to reset the password', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: '999999',
    });
    const { token } = await fakeUserTokensRepository.generate(id);
    const newPassword = '111111';
    await resetPassword.execute({ token, password: newPassword });
    const user = await fakeUsersRepository.findById(id);
    expect(user?.password).toBe(newPassword);
  });
  // HashChangeEvent
  // 2h de expiração
  // usertoken inesistentes
  // user inexistemte
});
