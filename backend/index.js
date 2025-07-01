const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.listen(5000, () => console.log("Server started on port 5000"));

const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);
