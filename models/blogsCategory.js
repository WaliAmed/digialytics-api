const mongoose = require("mongoose");

const BlogCategorySchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogCategories = mongoose.model("blogsCategories", BlogCategorySchema);

module.exports = BlogCategories;
