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

  public async save(key: string, value: unknown): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    return new Promise(console.log);
  }
}

export default RedisCacheProvider;
