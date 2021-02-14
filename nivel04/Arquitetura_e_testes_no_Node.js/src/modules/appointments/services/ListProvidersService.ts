import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/user';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgCacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );
    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });
      console.log('Aquery no banco foi feita');

      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
