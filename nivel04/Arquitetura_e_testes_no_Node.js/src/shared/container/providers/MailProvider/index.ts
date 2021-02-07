import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailprovider';
import EtherealMailPorvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailPorvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'RgIMailProvider',
  providers[mailConfig.driver],
);
