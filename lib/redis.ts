import { createClient, RedisClientType } from "redis";

const REDIS_HOST = process.env.REDIS_HOST as string;
const REDIS_PORT = process.env.REDIS_PORT as string;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
  throw new Error("Missing Redis connection environment variables");
}
interface RedisCache {
  conn?: RedisClientType;
  promise?: Promise<RedisClientType>;
}

declare global {
  // eslint-disable-next-line no-var
  var redis: RedisCache;
}

const cached: RedisCache = global.redis || (global.redis = {});

const redisConnect = async (): Promise<RedisClientType> => {
  if (cached.conn) {
    console.log("Connected to Redis (Cached)");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = (async () => {
      const client: RedisClientType = createClient({
        socket: {
          host: REDIS_HOST,
          port: Number(REDIS_PORT),
        },
        password: REDIS_PASSWORD,
      });

      client.on("error", (err) => {
        console.error("Redis Client Error", err);
      });

      await client.connect();
      console.log("Connected to Redis");

      cached.conn = client; // ✅ Assign the client to cached.conn
      return client;
    })();
  }

  return cached.promise;
};

export default redisConnect;
