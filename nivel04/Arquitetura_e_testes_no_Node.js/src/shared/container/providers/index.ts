import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailprovider';
import EtherealMailPorvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
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

container.registerInstance<IMailProvider>(
  'RgIMailProvider',
  container.resolve(EtherealMailPorvider),
);
