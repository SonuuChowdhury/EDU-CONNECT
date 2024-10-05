import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const RedisConnectionString = process.env.REDIS_HOST;
const RedisConnectionPort = process.env.REDIS_PORT;
const RedisPassword = process.env.REDIS_PASSWORD;

const RedisClient = redis.createClient({
    url: `redis://${RedisConnectionString}:${RedisConnectionPort}`,
    password: RedisPassword,
});

// Function to connect to Redis
const connectRedis = async () => {
  try {
    await RedisClient.connect();
    console.log('Connected to Redis Successfully!🐱‍🏍');
  } catch (err) {

    console.error('Redis connection error:', err);
  }
};

// Handle Redis errors
RedisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export { RedisClient, connectRedis };
