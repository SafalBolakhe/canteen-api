const router = require("express").Router();
const User = require("../models/user.model");
const Order = require("../models/order.model");
const Receipt = require("../models/receipt.model");
const verify = require("../verify");

router.get("/all", verify, async (req, res) => {
  try {
    id = req.payload.id;
    let receipts;
    const username = await User.findById(id);
    if (username.role === "admin") {
      receipts = await Receipt.find({});
    } else {
      receipts = await Receipt.find({ username: username.username });
    }
    res.status(200).json(receipts);
  } catch (error) {
    res.status(500).json(receipts);
  }
});

router.post("/:id", verify, async (req, res) => {
  const id = req.payload.id;
  const orderId = req.params.id;
  try {
    const username = await User.findById(id);
    const orders = await Order.findById(orderId);
    if (username.role === "admin" || orders.username === username.username) {
      const confirmedOrder = await Order.findById(orderId);
    //   console.log(await Receipt.find({ id: orderId }));
      if ((await Receipt.find({ id: orderId })) == []) {
        const newReceipt = new Receipt({
          username: confirmedOrder.username,
          items: confirmedOrder.items,
          cost: confirmedOrder.cost,
          id: confirmedOrder.id,
        });
        //   console.log(newReceipt);
        const savedReceipt = await newReceipt.save();
        //   console.log(savedReceipt);
        res.status(200).json(savedReceipt);
      } else {
        res.status(500).json("Receipt already Exists");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
