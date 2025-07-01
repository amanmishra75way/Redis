const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Redis connected"));

redisClient.connect();
module.exports = redisClient;

// to be used while hosted redis on server
// const redis = require("redis");
// require("dotenv").config();

// const redisClient = redis.createClient({
//   url: process.env.REDIS_URL,
// });

// redisClient.on("error", (err) => console.error("Redis Error:", err));
// redisClient.on("connect", () => console.log("Connected to Redis"));

// redisClient.connect();

// module.exports = redisClient;

// Add this to env REDIS_URL=rediss://default:<password>@your-redis-endpoint.upstash.io:6379
