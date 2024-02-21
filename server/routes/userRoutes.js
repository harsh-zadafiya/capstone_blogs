const express = require("express");

const {
  createNewAccount,
  login,
  validateSession,
  logout,
  forgotpassword,
  getprofile,
  updateprofile,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").post(createNewAccount);
router.route("/login").post(login);
router.route("/forgot").post(forgotpassword);
router.route("/session").get(validateSession);
router.route("/logout").get(logout);
router.route("/updateprofile").get(getprofile).post(updateprofile);

module.exports = router;
