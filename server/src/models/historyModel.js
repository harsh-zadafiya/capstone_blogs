const mongoose = require("mongoose");
const config = require("../config");

const historySchema = mongoose.Schema({
    _id: {
        type: String,
        auto: true,
        default: () => { return "TH" + Date.now() }
    },
    blogName: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    blogYear: {
        type: String,
        required: true,
    },
    carYear: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["food", "travelling"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        required: true,
    },
    auctionStatus: {
        type: String,
        required: true,
    },
    images: {
        type: mongoose.Schema.Types.Array,
        default: `${config.SERVER_DOMAIN}/assets/images/cars/car-default.jpg`,
    },
    auctionDetails: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

const transactionHistory = mongoose.model("transaction.histories", historySchema);

module.exports = { transactionHistory };
