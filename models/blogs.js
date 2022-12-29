const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sub_category: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("blogs", BlogSchema);

module.exports = Blogs;
