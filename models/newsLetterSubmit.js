const mongoose = require("mongoose");

const NewsLetterSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NewsLetter = mongoose.model("NewsLetter", NewsLetterSchema);

module.exports = NewsLetter;
