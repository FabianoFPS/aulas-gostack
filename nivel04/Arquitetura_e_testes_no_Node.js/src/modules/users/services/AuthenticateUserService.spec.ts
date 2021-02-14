import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserServices from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUseresRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserServices;
let authenticateUser: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('AuthenticateUser', () => {
  beforeAll(() => {
    fakeUseresRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserServices(
      fakeUseresRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUseresRepository,
      fakeHashProvider,
    );
  });
  it('should de able to authenticate', async () => {
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
    const user = {
      email: '_jhon@deo.com',
      password: 'abcdef',
    };
    await expect(authenticateUser.execute(user)).rejects.toBeInstanceOf(
      AppError,
    );
  });
  it('should not de able to authenticate with wrong password', async () => {
    const newUser = {
      name: 'John Doe',
      email: '2jhon@deo.com',
      password: 'abcdef',
    };
    const user = await createUser.execute(newUser);
    const { email } = user;

    await expect(
      authenticateUser.execute({
        email,
        password: 'asdf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
