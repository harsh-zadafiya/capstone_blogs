const historyModel = require("../models/historyModel").transactionHistory;

const createHistory = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Bad request - request body missing",
    });
  } else {
    let body = req.body;
    historyModel
      .create(body)
      .then((insertResp) => {
        res.status(201).json({ status: "record created", message: insertResp });
      })
      .catch((err) => {
        console.error("Error occured while insert transaction history: ", err);
        res
          .status(500)
          .json({ message: "internal server error", errorDescription: err });
      });
  }
};

const getAllHistoryForUser = (req, res) => {
  console.log(req.query);
  if (!req.params.userId) {
    res.status(400).json({
      message: "Bad request - user id missing from the request.",
    });
  } else {
    let filter = {};
    if (req.query.filter) {
      filter = JSON.parse(req.query.filter);
    }
    filter.userId = req.params.userId;
    historyModel
      .find(filter)
      .then((fetchResp) => {
        res.status(200).json({ success: true, data: fetchResp });
      })
      .catch((err) => {
        console.error("Error occured while getting transaction history: ", err);
        res
          .status(500)
          .json({ message: "internal server error", errorDescription: err });
      });
  }
};

const updateHistory = (req, res) => {
  if (!req.params.historyId) {
    res.status(400).json({
      message: "Bad request - user id missing from the request.",
    });
  } else if (!req.body) {
    res.status(400).json({
      message: "Bad request - request body missing",
    });
  } else {
    let body = req.body;
    historyModel
      .findByIdAndUpdate(req.params.historyId, { $set: body })
      .then((findResp) => {
        if (findResp) {
          res.status(201).json({ status: true, message: "record updated" });
        } else {
          res.status(400).json({ status: false, message: `update failed` });
        }
      })
      .catch((err) => {
        console.error("Error occured while update transaction history: ", err);
        res
          .status(500)
          .json({
            status: false,
            message: "internal server error",
            errorDescription: err,
          });
      });
  }
};

const removeHistory = (req, res) => {
  if (!req.params.historyId) {
    res.status(400).json({
      message: "Bad request - user id missing from the request.",
    });
  } else {
    historyModel
      .findByIdAndRemove(req.params.historyId)
      .then((removeResp) => {
        if (removeResp) {
          res.status(201).json({ status: true, message: "record deleted" });
        } else {
          res.status(400).json({ status: false, message: `Delete failed` });
        }
      })
      .catch((err) => {
        console.error("Error occured while update transaction history: ", err);
        res
          .status(500)
          .json({
            status: false,
            message: "internal server error",
            errorDescription: err,
          });
      });
  }
};

const getAllCompletedAuctions = async () => {
  let filter = {
    historyCreated: false,
    auctionStatus: { $in: ["done", "closed"] },
  };

  await historyModel.create(historyListings);
};

module.exports = {
  createHistory,
  getAllHistoryForUser,
  updateHistory,
  removeHistory,
};
