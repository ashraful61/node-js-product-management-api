const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price:{
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message:
        "status can't be {VALUE}, must be in-stock/out-of-stock/discontinued",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = productSchema;
