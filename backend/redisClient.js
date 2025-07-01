const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Redis connected"));

redisClient.connect();
module.exports = redisClient;
