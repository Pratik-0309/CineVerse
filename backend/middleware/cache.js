import { redisClient } from "../config/redis.js";

export const cacheMiddleware = (keyPrefix, expiry = 180) => {
  return async (req, res, next) => {
    try {
      const key = `${keyPrefix}`;

      const cachedData = await redisClient.get(key);

      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }

      const originalJson = res.json.bind(res);

      res.json = (body) => {
        redisClient.setEx(key, expiry, JSON.stringify(body));
        return originalJson(body);
      };

      next();

    } catch (error) {
      console.log("Redis Middleware Error:", error);
      next();
    }
  };
};