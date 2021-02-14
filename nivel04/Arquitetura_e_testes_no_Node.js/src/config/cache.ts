import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: RedisOptions;
}

export default {
  driver: 'redis',
  config: {
    port: Number(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASS || undefined,
  },
} as ICacheConfig;
