const router = require("express").Router();
const User = require("../models/user.model");
const Order = require("../models/order.model");
const costGrabber = require("../costgrabber");
const verify = require("../verify");
router.get("/all", verify, async (req, res) => {
  try {
    id = req.payload.id;
    let orders;
    const username = await User.findById(id);
    if (username.role === "admin") {
      orders = await Order.find({});
    } else {
      orders = await Order.find({ username: username.username });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/editorder/:id", verify, async (req, res) => {
  const id = req.payload.id;
  const orderId = req.params.id;
  try {
    const username = await User.findById(id);
    const orders = await Order.findById(orderId);
    if (username.role === "admin" || orders.username === username.username) {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/editorder/:id", verify, async (req, res) => {
  const id = req.payload.id;
  const orderId = req.params.id;
  //   console.log(orderId);
  try {
    const username = await User.findById(id);
    const orders = await Order.findById(orderId);
    if (username.role === "admin" || orders.username === username.username) {
      await Order.findByIdAndRemove(orderId);
      res.status(200).json("Order Deleted");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/addorder", verify, async (req, res) => {
  try {
    id = req.payload.id;
    const username = await User.findById(id);
    cost = await costGrabber(req.body.items);
    if (cost === 0) {
      res.status(500).json("Item not Found");
    } else {
      // console.log(username.username);
      const newOrder = new Order({
        username: username.username,
        items: req.body.items,
        cost: cost,
      });
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
