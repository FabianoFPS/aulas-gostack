import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/user';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const passwordmatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordmatched)
      throw new AppError('Incorrect email/password combination.', 401);

    const { secret, expiresIn } = authConfig.jwt;

    if (!secret) throw new AppError('Invalid secret');

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
