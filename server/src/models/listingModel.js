const mongoose = require("mongoose");

const config = require("../config");
const { listing } = require("../constants/listingConstants");

const listingSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: [true, "Blog should have a title"],
  },
  blogYear: {
    type: String,
    required: [true, "Blog should have a start year"],
  },
  subTitle: {
    type: String,
    // unique: true,
    required: [
      true,
      "Every blog has it's subtitle.",
    ],
  },
  category: {
    type: String,
    enum: ["food", "travelling"],
    required: [
      true,
      "Every blog is categorised into few types.",
    ],
  },
  authorName: {
    type: String,
    required: [true, "Author Name is must."],
  },
  location: {
    type: String,
    required: [true, "Location can't be empty. Please enter a value."],
  },
  blogDetails: {
    type: String,
    required: [true, "Blog Details is mandatory."],
    maxLength: 2100,
  },
  blogNotes: {
    type: String,
    maxLength: 2100,
  },
  status: {
    type: String,
    enum: [
      listing.status.UNDER_REVIEW,
      listing.status.APPROVED,
      listing.status.REJECTED,
    ],
    default: listing.status.UNDER_REVIEW,
  },
  auctionStatus: {
    type: String,
    enum: ["live", "done", "closed"],
  },
  images: {
    type: mongoose.Schema.Types.Array,
    default: `${config.SERVER_DOMAIN}/assets/images/cars/car-default.jpg`,
  },
  documents: {
    type: mongoose.Schema.Types.Array,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Listing must be added by a user"],
  },
});

module.exports = mongoose.model("Listing", listingSchema);
