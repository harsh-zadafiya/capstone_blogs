const express = require("express");

const controllers = require("../controllers/userController");

const router = express.Router();
router.get("/", controllers.getAllUsers);
router.route("/signup").post(controllers.createNewUser);
router.route("/login").post(controllers.validateUser);
router.route("/forgotpassword").post(controllers.forgotpassword);
router
  .route("/updateprofile")
  .get(controllers.checkAuth, controllers.getprofile)
  .post(controllers.checkAuth, controllers.updateProfile);
router.route("/checkUser").get(controllers.checkAuth, controllers.checkUser);
router.route("/delete").post(controllers.checkAuth, controllers.deleteaccount);
router.post("/:userId/block", controllers.toggleIsBlocked);
module.exports = router;
