require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const productRoutes = require("./src/routes/products");
app.use("/products", productRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server chạy tại http://localhost:${process.env.PORT || 3000}`);
});
