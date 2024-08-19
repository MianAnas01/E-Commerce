const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthanticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);

router.post("/product/new", isAuthanticatedUser, authorizeRoles("admin"), createProduct);
router.put("/product/:id", isAuthanticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/product/:id", isAuthanticatedUser, authorizeRoles("admin"), deleteProduct);

router.get("/product/:id", getProductDetails);


module.exports = router;  
