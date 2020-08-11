const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.user = user;
    req.token = token;
    console.log("Authentication success.");
    next();
  } catch (err) {
    res.status(401).send({ error: "Please Authenticate." });
  }
  next();
};

module.exports = auth;
