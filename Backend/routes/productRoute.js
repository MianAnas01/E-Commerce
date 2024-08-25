const express = require("express");
const upload = require("../utils/multer");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthanticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);

router.post("/admin/product/new", upload.single('avatar'), isAuthanticatedUser, authorizeRoles("admin"), createProduct);
router.put("/admin/product/:id", isAuthanticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/admin/product/:id", isAuthanticatedUser, authorizeRoles("admin"), deleteProduct);

router.get("/product/:id", getProductDetails);
router.put("/review",isAuthanticatedUser, createProductReview);
router.get("/reviews", getProductReviews);
router.delete("/reviews",isAuthanticatedUser, deleteReview)

module.exports = router;  
