import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    oldPassword = '',
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) throw new AppError('User not found.');

    const userWithUpdateEmail = await this.userRepository.findByEmail(email);
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id)
      throw new AppError('E-mail already in use.');

    user.name = name;
    user.email = email;

    const checkOldPassword =
      oldPassword === ''
        ? false
        : await this.hashProvider.compareHash(oldPassword, user.password);

    if (password && !checkOldPassword)
      throw new AppError('Old password does not match.');

    if (password && checkOldPassword)
      user.password = await this.hashProvider.generateHash(password);

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
