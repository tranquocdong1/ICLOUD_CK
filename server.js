require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const productRoutes = require("./src/routes/products");
app.use("/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API đang chạy...");
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server chạy tại http://localhost:${process.env.PORT}`);
});
