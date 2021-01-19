import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailprovider from '@shared/container/providers/MailProvider/models/IMailprovider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgIMailProvider')
    private mailprovider: IMailprovider,
    @inject('RgUsertokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('User does not exists');
    const { token } = await this.userTokensRepository.generate(user.id);
    // console.log('TOKEN:', token);

    await this.mailprovider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'GoBarber | Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
