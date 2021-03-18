import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserServices from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let createUser: CreateUserServices;

describe('CreateUser', () => {
  beforeEach(() => {
    createUser = new CreateUserServices(
      new FakeUsersRepository(),
      new FakeHashProvider(),
      new FakeCacheProvider(),
    );
  });
  it('should de able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not de able to create a new user with same email from another', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    };
    await createUser.execute(newUser);
    expect(createUser.execute(newUser)).rejects.toBeInstanceOf(AppError);
  });
});
