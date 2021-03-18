import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import { log } from 'debug';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailprovider';
import AppError from '@shared/errors/AppError';
import IMailtemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailtemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class EtherealMailPorvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('RgMailTemplateProvider')
    private mailTemplateProvider: IMailtemplateProvider,
  ) {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch(err => {
        throw new AppError('Create nodemailer', err.message);
      });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    log('Message sent: %s', message.messageId);
    log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
