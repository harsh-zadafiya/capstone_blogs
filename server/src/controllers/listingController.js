const Listing = require("../models/listingModel");
const multer = require("multer");
const fs = require("fs");
const p = require("path");
const fsExtra = require("fs-extra");
const sharp = require("sharp");

const config = require("../config");
const catchAsync = require("../utils/catchAsync");
const { listing } = require("../constants/listingConstants");
const AppError = require("../utils/appError");

// Below code configures the multer destination and filename. Destination gives multer the directory to save the files in and filename is used as the name of the actual file to save.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = p.join(
      __dirname,
      `../../public/assets/images/cars/${req.body.subTitle}`
    );
    fs.mkdirSync(path, { recursive: true });
    cb(null, `public/assets/images/cars/${req.body.subTitle}`);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const uniqueFileName = `car-${req.body.blogTitle.replaceAll(
      " ",
      ""
    )}-${req.body.blogYear.replaceAll(" ", "")}-${Date.now()}.${extension}`;
    cb(null, uniqueFileName);
  },
});

// Creates a multer instance with the Disk Stroage technique.
const upload = multer({ storage });

// Takes multiple files as input with "images" as the field name and stores it in the actual destination given above.
exports.uploadCarImages = upload.array("images[]");

exports.addBlogRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const {
      blogTitle,
      blogYear,
      subTitle,
      category,
      authorName,
      location,
      highlight,
      blogDetails,
    } = req.body;

    // req.files is set by multer after saving the file
    req.body.images = req.files.map((file) => {
      return `${config.SERVER_DOMAIN}/assets/images/cars/${req.body.subTitle}/${file.filename}`;
    });

    const blog = await Listing.create({
      blogTitle,
      blogYear,
      subTitle,
      catgeory,
      authorName,
      location,
      highlight,
      blogDetails,
      status: listing.status.UNDER_REVIEW,
      images: req.body.images,
      userId: user._id,
    });

    res.status(200).json({
      status: "Success",
      blog,
    });
  } catch (err) {
    fsExtra.removeSync(
      p.join(__dirname, `../../public/assets/images/cars/${req.body.subTitle}`)
    );
    return next(err);
  }
};

exports.getAllBlog = catchAsync(async (req, res, next) => {
  const { filter } = req.query;

  let obj = {};

  filter === "favorite" && (obj.favorite = true);
  filter === "my-listings" && (obj.userId = req.user._id);

  const blogs = await Listing.find(obj);
  res.status(201).json({
    status: "success",
    blogs,
  });
});

exports.getBlogDetails = catchAsync(async (req, res, next) => {
  const { subTitle } = req.params;

  const blog = await Listing.findOne({ subTitle });

  res.status(200).json({
    status: "success",
    blog,
  });
});

exports.deleteBlogListing = catchAsync(async (req, res, next) => {
  const { subTitle } = req.params;
  const loggedInUser = req.user;
  let blog;

  if (loggedInUser.role === "admin") {
    blog = await Listing.findOneAndRemove({ subTitle });
  } else {
    blog = await Listing.findOneAndRemove({
      subTitle,
      status: { $in: [listing.status.UNDER_REVIEW] },
    });
  }

  if (!blog)
    return next(
      new AppError(
        `Either listing was not found OR you don't have permission to delete this listing.`
      )
    );

  fsExtra.removeSync(
    p.join(__dirname, `../../public/assets/images/cars/${subTitle}`)
  );
  fsExtra.removeSync(
    p.join(__dirname, `../../public/assets/documents/cars/${subTitle}`)
  );
  res.status(200).json({
    status: "success",
    blog,
  });
});

exports.changeListingStatus = (status) => {
  return catchAsync(async (req, res, next) => {
    const { subTitle } = req.params;

    const blog = await Listing.findOneAndUpdate(
      { subTitle },
      { status },
      {
        new: true,
      }
    );

    if (!blog) return next(new AppError(`No Listing found with vin : ${subTitle}`));

    res.status(200).json({
      status: "success",
      blog,
    });
  });
};

exports.updateFavorite = catchAsync(async (req, res, next) => {
  const { subTitle } = req.params;
  const { favorite } = req.body;

  const blog = await Listing.findOneAndUpdate(
    { subTitle },
    {
      favorite,
    },
    {
      new: true,
    }
  );

  if (!blog) return next(new AppError(`No Listing found with vin : ${subTitle}`));

  res.status(200).json({
    status: "success",
    blog,
  });
});

exports.updateBlogListing = catchAsync(async (req, res, next) => {
  const { subTitle } = req.params;
  const {
    blogTitle,
    blogYear,
    category,
    location,
    blogNotes,
    authorName,
    blogDetails,
  } = req.body;

  const blog = await Listing.findOneAndUpdate(
    { subTitle },
    {
      blogTitle,
      blogYear,
      location,
      category,
      highlight,
      blogDetails,
      blogNotes,
      authorName,
    }
  );

  if (!blog) {
    return next(new AppError("No listing was found with the given SubTitle", 400));
  }

  res.status(200).json({
    status: "success",
    blog,
  });
});
