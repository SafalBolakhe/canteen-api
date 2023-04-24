const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/registration", async (req, res) => {
  try {
    // console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hashedpass,
      role: req.body.role,
    });
    // console.log(newUser);
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/logout", async (req, res) => {
  try {
    // console.log(req.body);
    if (req.headers.authorization) {
      req.headers.authorization = "";
      res.status(200).json("Logged out successfully");
    } else {
      res.status(500).json("You need to Login first");

    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const name = req.body.username;
  const pass = req.body.password;
  try {
    if (name && pass != "") {
      const find = await User.findOne({ username: name });
      const match = await bcrypt.compare(pass, find.password);
      if (match) {
        const accesstoken = jwt.sign({ id: find._id }, process.env.secretkey);
        // console.log(req.headers.authorization);
        req.headers.authorization = `Bearer ${accesstoken}`;
        // console.log(req.headers.authorization);
        res
          .status(200)
          .json({ username: find.username, accesstoken: accesstoken });
      } else {
        res.status(403).json("Wrong credentials");
      }
    } else {
      res.status(403).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
