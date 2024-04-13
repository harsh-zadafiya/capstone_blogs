const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required for the comment."],
    },
  },
  { timestamps: true }
);
commentSchema.methods.populateUserFullName = async function () {
  await this.populate("user", "firstName lastName").execPopulate();
  return `${this.user.firstName} ${this.user.lastName}`;
};

module.exports = mongoose.model("Comment", commentSchema);
