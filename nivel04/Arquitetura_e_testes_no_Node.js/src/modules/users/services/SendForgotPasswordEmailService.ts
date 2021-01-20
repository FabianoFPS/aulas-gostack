import { injectable, inject } from 'tsyringe';
import path from 'path';

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
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgto_password.hbs',
    );
    await this.mailprovider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'GoBarber | Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
