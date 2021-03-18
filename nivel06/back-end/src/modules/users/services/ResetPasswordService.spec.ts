import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
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
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({ token, password: newPassword });
    const user = await fakeUsersRepository.findById(id);
    expect(generateHash).toHaveBeenCalledWith(newPassword);
    expect(user?.password).toBe(newPassword);
  });
  it('should not be able to reset the password non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'nonj-existing-user',
    );
    await expect(
      resetPassword.execute({
        token,
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should de able to reset the password if passed more than 2 hours', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: '999999',
    });
    const { token } = await fakeUserTokensRepository.generate(id);
    const newPassword = '111111';
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custonDate = new Date();
      return custonDate.setHours(custonDate.getHours() + 3);
    });
    await expect(
      resetPassword.execute({ token, password: newPassword }),
    ).rejects.toBeInstanceOf(AppError);
  });
  // HashChangeEvent
  // 2h de expiração
  // usertoken inesistentes
  // user inexistemte
});
