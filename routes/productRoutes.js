const express = require("express");
const productsController = require("../controllers/productcontroller");
const router = express.Router();

router.post("/add-product/:firmId", productsController.addProduct);
router.get("/:firmId/products", productsController.getProductsByFirmId);
router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/:productId", productsController.deleteProductById);

module.exports = router;
