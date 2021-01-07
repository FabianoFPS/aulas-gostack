import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserServices from '@modules/users/services/CreateUserService';

describe('CreateUser', () => {
  it('should de able to create a new user', async () => {
    const fakeUseresRepository = new FakeUsersRepository();
    const createUser = new CreateUserServices(fakeUseresRepository);
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not de able to create a new user with same email from another', async () => {
    const fakeUseresRepository = new FakeUsersRepository();
    const createUser = new CreateUserServices(fakeUseresRepository);
    const newUser = {
      name: 'John Doe',
      email: 'jhon@deo.com',
      password: 'abcdef',
    };
    await createUser.execute(newUser);
    expect(createUser.execute(newUser)).rejects.toBeInstanceOf(AppError);
  });
});
