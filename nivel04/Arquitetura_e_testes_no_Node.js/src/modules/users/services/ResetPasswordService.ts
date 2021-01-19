import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgUsertokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject('RgHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new AppError('User token does not exists');
    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) throw new AppError('User does not exists');
    const compareDate = addHours(userToken.created_at, 2);
    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired');
    user.password = await this.hashProvider.generateHash(password);
    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
