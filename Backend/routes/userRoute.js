const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/userController");

const {isAuthanticatedUser, authorizeRoles } = require("../middleware/auth")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/password/forgot", forgotPassword);
router.get("/logout", logout);
router.put("/password/resetoken/:token", resetPassword )
router.get("/me",isAuthanticatedUser, getUserDetails)
router.put("/password/update", isAuthanticatedUser, updatePassword)
router.put("/me/update", isAuthanticatedUser, updateProfile)


module.exports = router;
