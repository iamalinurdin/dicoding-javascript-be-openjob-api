import process from "process";
import { createClient } from "redis";

class CacheService {
  constructor() {
    this.redis = createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    this.redis.on("error", (error) => {
      console.log("error", error);
    });

    this.redis.connect();
  }

  async set(key, value, expiration = 3600) {
    await this.redis.set(key, value, {
      EX: expiration,
    });
  }

  async get(key) {
    const result = await this.redis.get(key);

    if (!result) {
      throw new Error("cache tidak ditemukan");
    }

    return result;
  }

  remove(key) {
    return this.redis.del(key);
  }
}

export default CacheService;
