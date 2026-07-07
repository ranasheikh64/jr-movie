const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.log('Redis disconnected. Max retries reached. Running without cache.');
        return new Error('Max retries reached'); // Stop retrying
      }
      return Math.min(retries * 50, 500);
    }
  }
});

redisClient.on('error', (err) => {
  // Ignore ECONNREFUSED logs to prevent console spam when running locally without Redis
  if (err.code !== 'ECONNREFUSED') {
    console.log('Redis Client Error', err);
  }
});
redisClient.on('connect', () => console.log('Redis Connected'));

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.log('Could not connect to Redis. Running without cache.');
  }
};

module.exports = { redisClient, connectRedis };
