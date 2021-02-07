import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailprovider';
import EtherealMailPorvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/container/providers/MailProvider/implementations/SESMailProvider';
import IMailtemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailtemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'RgStorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailtemplateProvider>(
  'RgMailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

const containerResolve = {
  ses: () => container.resolve(SESMailProvider),
  ethereal: () => container.resolve(EtherealMailPorvider),
};

container.registerInstance<IMailProvider>(
  'RgIMailProvider',
  containerResolve[mailConfig.driver](),
  // mailConfig.driver === 'ethereal'
  //   ? container.resolve(EtherealMailPorvider)
  //   : container.resolve(SESMailProvider),
);
