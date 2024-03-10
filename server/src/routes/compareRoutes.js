const express = require("express");
const { getAllBlogs } = require("../controllers/compareController");
const router = express.Router();
router.route("/compare").get(getAllBlogs);
module.exports = router;
