import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  // eslint-disable-next-line camelcase
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgStorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    const unauthorizedHttpCode = 401;
    if (!user)
      throw new AppError(
        'Only authenticated users can change avatart',
        unauthorizedHttpCode,
      );

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;
    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
