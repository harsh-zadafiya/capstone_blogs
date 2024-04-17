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

app.use(
  "/listing",
  (req, res, next) => {
    console.log("came here");
    next();
  },
  listingRouter
);
app.use("/user", userRouter);
// app.use("/user", userRoter);
app.use("/document", documentRouter);
app.use("/user/history/", historyRouter);
app.use("/comparecar", compareRouter);

app.use(globalErrorHandlerMiddleware);
app.listen(PORT, () => {
  console.log(`Canada 4 U server is running on port: ${PORT}`);
});

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const quantity = 1;
const SUCCESS_URL = "http://localhost:3000/confirmation-page";
const CANCEL_URL = "http://localhost:3000/subscription-plans";
app.post("/create-checkout-basic-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      line_items: [
        {
          price: process.env.STRIPE_BASIC_PRICE_API_ID,
          quantity: quantity,
        },
      ],
      mode: "subscription",
    });
    console.log("session: ", session.id, session.url, session);

    // get id, save to user, return url
    const sessionId = session.id;
    console.log("sessionId: ", sessionId);

    // save session.id to the user in your database

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/create-checkout-pro-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      line_items: [
        {
          price: process.env.STRIPE_PRO_PRICE_API_ID,
          quantity: quantity,
        },
      ],
      mode: "subscription",
    });
    console.log("session: ", session.id, session.url, session);

    // get id, save to user, return url
    const sessionId = session.id;
    console.log("sessionId: ", sessionId);

    // save session.id to the user in your database

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/create-checkout-premium-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      line_items: [
        {
          price: process.env.STRIPE_PREMIUM_PRICE_API_ID,
          quantity: quantity,
        },
      ],
      mode: "subscription",
    });
    console.log("session: ", session.id, session.url, session);

    // get id, save to user, return url
    const sessionId = session.id;
    console.log("sessionId: ", sessionId);

    // save session.id to the user in your database

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
