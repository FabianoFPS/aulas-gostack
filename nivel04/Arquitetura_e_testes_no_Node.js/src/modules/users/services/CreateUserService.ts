import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

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
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) throw new AppError('Email adress already used.');
    const salt = 8;
    const hashdPassword = await hash(password, salt);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashdPassword,
    });

    return user;
  }
}

export default CreateUserService;
