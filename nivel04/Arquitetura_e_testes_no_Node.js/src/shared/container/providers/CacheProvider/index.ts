import { container } from 'tsyringe';

import RedisCacheProvider from './implementations/RedisCacheProvider';
import ICacheProvider, {
  ICacheProviderRegistri,
} from './models/ICacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  ICacheProviderRegistri,
  providers.redis,
);
