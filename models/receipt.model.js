const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: false,
      default: [],
    },
    cost: {
      type: Integer,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.models("Receipt", receiptSchema);
