const express = require("express");
const Product = require("../models/Product");
const redisClient = require("../redisClient");

const router = express.Router();

// GET: Fetch products with Redis cache
router.get("/", async (req, res) => {
  try {
    const cacheData = await redisClient.get("products");

    if (cacheData) {
      return res.status(200).json({
        source: "cache",
        data: JSON.parse(cacheData),
      });
    }

    const products = await Product.find();
    await redisClient.setEx("products", 3600, JSON.stringify(products)); // Cache for 1 hour

    return res.status(200).json({
      source: "database",
      data: products,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST: Add new product and invalidate cache
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    // Validate input
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Save product to MongoDB
    const newProduct = new Product({ name, price });
    const savedProduct = await newProduct.save();

    // Invalidate Redis cache
    await redisClient.del("products");

    return res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating product" });
  }
});

module.exports = router;
