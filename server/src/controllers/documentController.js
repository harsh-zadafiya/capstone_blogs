const multer = require("multer");
const p = require("path");
const archiver = require("archiver");
const fs = require("fs");
const Listing = require("../models/listingModel");
const config = require("../config");
const AppError = require("../utils/appError");
const fsExtra = require("fs-extra");

// Below code configures the multer destination and filename. Destination gives multer the directory to save the files in and filename is used as the name of the actual file to save.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = p.join(
      __dirname,
      `../../public/assets/documents/cars/${req.body.subTitle}`
    );
    fs.mkdirSync(path, { recursive: true });
    cb(null, `public/assets/documents/cars/${req.body.subTitle}`);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const uniqueFileName = `document-${req.body.blogTitle.replaceAll(
      " ",
      ""
    )}-${req.body.subTitle.replaceAll(" ", "")}-${Date.now()}.${extension}`;
    cb(null, uniqueFileName);
  },
});

// Creates a multer instance with the Disk Stroage technique.
const upload = multer({ storage });

// Takes multiple files as input with "images" as the field name and stores it in the actual destination given above.
exports.uploadCarDocuments = upload.array("documents[]");

exports.saveDocumentsToDb = async (req, res, next) => {
  const { subTitle } = req.body;

  // req.files is set by multer after saving the file
  req.body.documents = req.files.map((doc) => {
    return `${config.SERVER_DOMAIN}/assets/documents/cars/${subTitle}/${doc.filename}`;
  });

  try {
    const blog = await Listing.findOneAndUpdate(
      { subTitle },
      { $push: { documents: { $each: req.body.documents } } },
      { new: true }
    );

    if (!car) {
      fsExtra.removeSync(
        p.join(__dirname, `../../public/assets/documents/cars/${req.body.subTitle}`)
      );
      return next(
        new AppError("No Listing was found with the provided SubTitle", 400)
      );
    }

    res.status(201).json({
      status: "success",
      car,
    });
  } catch (err) {
    fsExtra.removeSync(
      p.join(__dirname, `../../public/assets/documents/cars/${req.body.subTitle}`)
    );
    return next(err);
  }
};

exports.downloadCarDocuments = (req, res, next) => {
  const { subTitle } = req.params;

  const dirPath = p.join(
    __dirname,
    `../../public/assets/documents/cars/${subTitle}`
  );

  // zlib sets the degree of compression. 'archiver' library is used to zip multiple files into one.
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  // Reads all the file from the current working directory i.e. 'dirPath'
  archive.glob("**/*", { cwd: dirPath });

  // Sets the content type to zip
  res.set("Content-Type", "application/zip");
  res.set("Content-Disposition", `attachment; filename="output.zip"`);
  archive.pipe(res);

  // Sends the response(i.e. zip file) to a client.
  archive.finalize();
};
