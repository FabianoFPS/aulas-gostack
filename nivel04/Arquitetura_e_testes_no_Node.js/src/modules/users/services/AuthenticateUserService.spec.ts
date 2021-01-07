import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserServices from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should de able to authenticate', async () => {
    const fakeUseresRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserServices(
      fakeUseresRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUseresRepository,
      fakeHashProvider,
    );
    const newUser = {
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    };
    const user = await createUser.execute(newUser);
    const { email, password } = newUser;
    const response = await authenticateUser.execute({ email, password });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not de able to authenticate with non existing user', async () => {
    const fakeUseresRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUseresRepository,
      fakeHashProvider,
    );
    const user = {
      email: 'jhon@deo.com',
      password: 'abcdef',
    };
    expect(authenticateUser.execute(user)).rejects.toBeInstanceOf(AppError);
  });
  it('should not de able to authenticate with wrong password', async () => {
    const fakeUseresRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserServices(
      fakeUseresRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUseresRepository,
      fakeHashProvider,
    );
    const newUser = {
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    };
    const user = await createUser.execute(newUser);
    const { email } = user;

    expect(
      authenticateUser.execute({
        email,
        password: 'asdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
