const express = require("express");
const Product = require("../models/Product");
const redisClient = require("../redisClient");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Check Redis Cache
    const cacheData = await redisClient.get("products");

    if (cacheData) {
      return res.status(200).json({
        source: "cache",
        data: JSON.parse(cacheData),
      });
    }

    // If not cached, fetch from DB
    const products = await Product.find();

    // Store in Redis
    await redisClient.setEx("products", 3600, JSON.stringify(products)); // 1 hour

    return res.status(200).json({
      source: "database",
      data: products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
