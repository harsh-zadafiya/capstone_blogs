const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// const { job } = require("./utils/cronjob");

var bodyParser = require("body-parser");

const historyRouter = require("./routes/historyRoutes");
const userRouter = require("./routes/userRouter");

const listingRouter = require("./routes/listingRoutes");
const userRoter = require("./routes/userRouter");
const documentRouter = require("./routes/documentsRoutes");
const globalErrorHandlerMiddleware = require("./controllers/errorController");
const compareRouter = require("./routes/compareRoutes");
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (err) => {
  console.log(err);
});

database.once("connected", () => {
  console.log("===== DATABASE CONNECTION SUCCESSFUL =====");
  console.log("dff", process.env.MONGO_URI);
});

app.use(cors(corsOptions));

app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/listing", listingRouter);
app.use("/user", userRouter);
// app.use("/user", userRoter);
app.use("/document", documentRouter);
app.use("/user/history/", historyRouter);
app.use("/comparecar", compareRouter);

app.use(globalErrorHandlerMiddleware);
app.listen(PORT, () => {
  console.log(`Canada 4 U server is running on port: ${PORT}`);
});
