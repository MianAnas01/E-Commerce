const express = require("express");
const upload = require("../utils/multer");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const { isAuthanticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/register", upload.single('avatar'), registerUser);


router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.get("/logout", logout);
router.put("/password/resetoken/:token", resetPassword);
router.get("/me", isAuthanticatedUser, getUserDetails);
router.put("/password/update", isAuthanticatedUser, updatePassword);
router.put("/me/update", isAuthanticatedUser, updateProfile);

router.get("/admin/users", isAuthanticatedUser, authorizeRoles("admin"), getAllUsers);
router.get("/admin/user/:id", isAuthanticatedUser, authorizeRoles("admin"), getSingleUser);
router.put("/admin/user/:id", isAuthanticatedUser, authorizeRoles("admin"), updateUserRole);
router.delete("/admin/user/:id", isAuthanticatedUser, authorizeRoles("admin"), deleteUser);



module.exports = router;
