const express = require("express");

const {
  addBlogRequest,
  uploadCarImages,
  getAllBlog,
  getBlogDetails,
  deleteBlogListing,
  changeListingStatus,
  updateFavorite,
  updateBlogListing,
} = require("../controllers/listingController");
const { listing } = require("../constants/listingConstants");

const { checkAuth } = require("../controllers/userController");

const router = express.Router();

router.use(checkAuth);

router.route("/").post(uploadCarImages, addBlogRequest).get(getAllBlog);
router
  .route("/:vin")
  .get(getBlogDetails)
  .delete(deleteBlogListing)
  .put(updateBlogListing);
router.route("/approve/:vin").put(changeListingStatus(listing.status.APPROVED));
router.route("/reject/:vin").put(changeListingStatus(listing.status.REJECTED));
router.route("/favorite/:vin").post(updateFavorite);

module.exports = router;
