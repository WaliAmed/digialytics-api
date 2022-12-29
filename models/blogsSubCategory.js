const mongoose = require("mongoose");

const BlogSubCategorySchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const blogSubCategories = mongoose.model(
  "blogsSubCategories",
  BlogSubCategorySchema
);

module.exports = blogSubCategories;
