/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async recover(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  public async invalidate(key: string): Promise<void> {
    return new Promise(console.log);
  }
}

export default RedisCacheProvider;
