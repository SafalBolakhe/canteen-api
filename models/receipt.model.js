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
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Receipts", receiptSchema);
