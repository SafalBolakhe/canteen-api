const Order = require("../models/order.model");
const Item = require("../models/items.model");
const router = require("express").Router();
const User = require("../models/user.model");
const verify = require("../verify");

router.get("/all", async (req, res) => {
  try {
    let items;
    items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/edititem/:id", verify, async (req, res) => {
  const id = req.payload.id;
  const itemId = req.params.id;
  try {
    const username = await User.findById(id);
    const items = await Item.findById(itemId);
    if (username.role === "admin") {
      const updatedItem = await Item.findByIdAndUpdate(
        itemId,
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

router.delete("/:id", verify, async (req, res) => {
  const id = req.payload.id;
  const itemId = req.params.id;
  //   console.log(orderId);
  try {
    const username = await User.findById(id);
    const items = await Item.findById(itemId);
    if (username.role === "admin") {
      await Order.findByIdAndRemove(orderId);
      res.status(200).json("Order Deleted");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/additem", verify, async (req, res) => {
  try {
    id = req.payload.id;
    const username = await User.findById(id);
    // console.log(username.username);
    // console.log(await Item.find({ itemname: req.body.itemname }).count());
    // console.log(username.role);
    // console.log(req.body.cost);
    // console.log(req.body.itemname);
    if (
      (username.role === "admin") &&
      (await Item.find({ itemname: req.body.itemname }).count() === 0)
    ) {
      const newItem = new Item({
        itemname: req.body.itemname,
        cost: req.body.cost,
      });
      //   console.log(newItem);
      const savedItem = await newItem.save();
      res.status(200).json(savedItem);
    } else {
      res.status(500).json("Not an admin or the item exists");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
