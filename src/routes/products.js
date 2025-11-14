const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE (Thêm sản phẩm)
router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const result = await db.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );

    res.json({ message: "Thêm sản phẩm thành công", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ALL (Lấy tất cả sản phẩm)
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ONE (Lấy sản phẩm theo ID)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE (Cập nhật sản phẩm)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const result = await db.query(
      "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *",
      [name, price, description, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json({ message: "Cập nhật thành công", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE (Xóa sản phẩm)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
