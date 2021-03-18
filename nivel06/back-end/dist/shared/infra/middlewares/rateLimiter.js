"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reteLimiter;

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _redis = _interopRequireDefault(require("redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  // 10 requests
  duration: 1 // per 1 second by IP

});

async function reteLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (error) {
    throw new _AppError.default(`Too many requests: ${error}`, 429);
  }
}