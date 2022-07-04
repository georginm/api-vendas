import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

const cacheConfig = {
  config: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASS || '',
    },
  },
  driver: 'redis',
} as ICacheConfig;

export { cacheConfig };
