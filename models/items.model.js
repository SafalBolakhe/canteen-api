const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Items", itemSchema);
