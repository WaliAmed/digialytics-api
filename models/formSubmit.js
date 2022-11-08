const mongoose = require("mongoose");
const { randomUUID } = require("crypto"); // Added in: node v14.17.0

const FormSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
