const Listing = require("../models/listingModel");
const Comment = require("../models/commentModel");
const multer = require("multer");
const fs = require("fs");
const p = require("path");
const fsExtra = require("fs-extra");
const sharp = require("sharp");

const config = require("../config");
const catchAsync = require("../utils/catchAsync");
const { listing } = require("../constants/listingConstants");
const AppError = require("../utils/appError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = p.join(
      __dirname,
      `../../public/assets/images/cars/${req.body.vin}`
    );
    fs.mkdirSync(path, { recursive: true });
    cb(null, `public/assets/images/cars/${req.body.vin}`);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const uniqueFileName = `car-${req.body.carCompany.replaceAll(
      " ",
      ""
    )}-${req.body.carModel.replaceAll(" ", "")}-${Date.now()}.${extension}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

exports.uploadCarImages = upload.array("images[]");

exports.addSellCarRequest = async (req, res, next) => {
  try {
    const user = req.user;
    const {
      carCompany,
      carMileage,
      carModel,
      carEngine,
      vin,
      transmission,
      sellerName,
      location,
      highlight,
      recentServiceHistory,
      ownershipHistory,
    } = req.body;

    req.body.images = req.files.map((file) => {
      return `${config.SERVER_DOMAIN}/assets/images/cars/${req.body.vin}/${file.filename}`;
    });

    const car = await Listing.create({
      carCompany,
      carModel,
      carMileage,
      carEngine,
      vin,
      transmission,
      sellerName,
      location,
      highlight,
      ownershipHistory,
      recentServiceHistory,
      status: listing.status.UNDER_REVIEW,
      images: req.body.images,
      userId: user._id,
    });

    res.status(200).json({
      status: "Success",
      car,
    });
  } catch (err) {
    fsExtra.removeSync(
      p.join(__dirname, `../../public/assets/images/cars/${req.body.vin}`)
    );
    return next(err);
  }
};

exports.getAllCar = catchAsync(async (req, res, next) => {
  const { filter } = req.query;

  let obj = {};

  filter === "favorite" && (obj.favorite = true);
  filter === "my-listings" && (obj.userId = req.user._id);

  const cars = await Listing.find(obj);
  res.status(201).json({
    status: "success",
    cars,
  });
});

exports.getCarDetails = catchAsync(async (req, res, next) => {
  const { vin } = req.params;

  const car = await Listing.findOne({ vin });

  res.status(200).json({
    status: "success",
    car,
  });
});

exports.deleteCarListing = catchAsync(async (req, res, next) => {
  const { vin } = req.params;
  const loggedInUser = req.user;
  let car;

  if (loggedInUser.role === "admin") {
    car = await Listing.findOneAndRemove({ vin });
  } else {
    car = await Listing.findOneAndRemove({
      vin,
      status: { $in: [listing.status.UNDER_REVIEW] },
    });
  }

  if (!car)
    return next(
      new AppError(
        `Either listing was not found OR you don't have permission to delete this listing.`
      )
    );

  fsExtra.removeSync(
    p.join(__dirname, `../../public/assets/images/cars/${vin}`)
  );
  fsExtra.removeSync(
    p.join(__dirname, `../../public/assets/documents/cars/${vin}`)
  );
  res.status(200).json({
    status: "success",
    car,
  });
});

exports.changeListingStatus = (status) => {
  return catchAsync(async (req, res, next) => {
    const { vin } = req.params;

    const car = await Listing.findOneAndUpdate(
      { vin },
      { status },
      {
        new: true,
      }
    );

    if (!car) return next(new AppError(`No Listing found with vin : ${vin}`));

    res.status(200).json({
      status: "success",
      car,
    });
  });
};

exports.updateFavorite = catchAsync(async (req, res, next) => {
  const { vin } = req.params;
  const { favorite } = req.body;

  const car = await Listing.findOneAndUpdate(
    { vin },
    {
      favorite,
    },
    {
      new: true,
    }
  );

  if (!car) return next(new AppError(`No Listing found with vin : ${vin}`));

  res.status(200).json({
    status: "success",
    car,
  });
});

exports.updateCarListing = catchAsync(async (req, res, next) => {
  const { vin } = req.params;
  const {
    carCompany,
    carModel,
    carMileage,
    carEngine,
    transmission,
    location,
    highlight,
    recentServiceHistory,
    sellerNotes,
    sellerName,
    ownershipHistory,
  } = req.body;

  const car = await Listing.findOneAndUpdate(
    { vin },
    {
      carCompany,
      carModel,
      carMileage,
      location,
      carEngine,
      transmission,
      highlight,
      ownershipHistory,
      recentServiceHistory,
      sellerNotes,
      sellerName,
    }
  );

  if (!car) {
    return next(new AppError("No listing was found with the given VIN", 400));
  }

  res.status(200).json({
    status: "success",
    car,
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const { vin } = req.params;
  const { text } = req.body;
  const user = req.user;

  try {
    const comment = await Comment.create({ text, user: user._id });

    const listing = await Listing.findOneAndUpdate(
      { vin },
      { $push: { comments: comment } },
      { new: true }
    );

    if (!listing) {
      return res
        .status(404)
        .json({ status: false, message: "Listing not found" });
    }
    res.status(201).json({
      status: "success",
      comment,
      listing,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

exports.getComments = catchAsync(async (req, res, next) => {
  const { vin } = req.params;

  try {
    const listing = await Listing.findOne({ vin }).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "firstName lastName",
      },
    });

    if (!listing) {
      return res
        .status(404)
        .json({ status: false, message: "Listing not found" });
    }

    res.status(200).json({ status: "success", comments: listing.comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});
