const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route");
const receiptRoute = require("./routes/receipt.route");
const itemRoute = require("./routes/item.route");
const dotenv = require("dotenv");

dotenv.config();
mongoose
  .connect(process.env.mongourl)
  .then(console.log("Connected to db"))
  .catch((err) => {
    console.error(err, "DB connection");
  });

app = express();

app.use(express.json());

app.post("/", (req, res) => {
  res.send("here");
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
app
  .use("/user", userRoute)
  .use("/order", orderRoute)
  .use("/receipt", receiptRoute)
  .use("/item", itemRoute);
