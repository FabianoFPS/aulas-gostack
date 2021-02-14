import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'um',
      email: 'um@tt.com',
      password: 'asdfgh',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'dois',
      email: 'dois@tt.com',
      password: 'qwerty',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'user',
      email: 'user@tt.com',
      password: 'zxcvbn',
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
