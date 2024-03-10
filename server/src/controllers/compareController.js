
const Listing = require("../models/listingModel");
const catchAsync = require("../utils/catchAsync");

const getAllBlogs = async (req, res) => {
  try {
    const allData = await Listing.find();
    const filteredData = allData.map((blog) => ({
      Image: blog.images,
      Brand: blog.blogTitle,
      Model: blog.blogYear,
     
    
      SubTitle: blog.subTitle,
      Category: blog.category,
      Author: blog.authorName,
      Location: blog.location,
      AuctionStatus: car.auctionStatus,
      BlogNotes: blog.blogNotes,
    }));
    res.status(200).json({
      status: "success",
      cars: filteredData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllBlogs,
};
