const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder, updateOrder } = require("../controllers/orderController");


const router = express.Router();
const { isAuthanticatedUser, authorizeRoles } = require("../middleware/auth");


router.post("/order/new", isAuthanticatedUser, newOrder);
router.get("/order/:id", isAuthanticatedUser, getSingleOrder);
router.get("/orders/me", isAuthanticatedUser, myOrders);


router.get("/admin/orders", isAuthanticatedUser, authorizeRoles("admin"), getAllOrders);
router.put("/admin/order/:id", isAuthanticatedUser, authorizeRoles("admin"), updateOrder);
router.delete("/admin/order/:id", isAuthanticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;