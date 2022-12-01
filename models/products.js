const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
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
    overview: {
      type: String,
      required: true,
    },
    the_challenge: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", ProductSchema);

module.exports = Products;
