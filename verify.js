const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.secretkey, (err, payload) => {
      if (err) {
        return res.status(401).json("Invalid token");
      }
      req.payload = payload;
      next();
    });
  } else {
    return res.status(401).json("Please login first");
  }
};
module.exports = verify;
