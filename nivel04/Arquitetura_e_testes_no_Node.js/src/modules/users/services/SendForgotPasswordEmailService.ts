import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/user';
// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailprovider from '@shared/container/providers/MailProvider/models/IMailprovider';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('RgUsersRepository')
    private userRepository: IUsersRepository,
    @inject('RgMailprovider')
    private mailprovider: IMailprovider,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async execute({ email }: IRequest): Promise<void> {
    this.mailprovider.sendMail(
      email,
      'Pedido de recuperação de senha recebida',
    );
  }
}

export default SendForgotPasswordEmailService;
