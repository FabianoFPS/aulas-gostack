import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvider, {
  ICacheProviderRegistri,
} from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgHashProvider')
    private hashProvider: IHashProvider,
    @inject(ICacheProviderRegistri)
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) throw new AppError('Email adress already used.');
    const hashdPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashdPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');
    return user;
  }
}

export default CreateUserService;
