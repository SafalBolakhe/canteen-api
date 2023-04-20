const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderSchema);
