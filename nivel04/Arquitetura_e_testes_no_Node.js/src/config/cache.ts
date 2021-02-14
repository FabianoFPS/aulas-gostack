import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: RedisOptions;
}

export default {
  driver: 'redis',
  config: {
    port: 6379,
    host: '127.0.0.1',
    password: undefined,
  },
} as ICacheConfig;
