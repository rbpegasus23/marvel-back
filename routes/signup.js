const express = require("express");
const User = require("../models/User");
const SHA256 = require("crypto-js/sha256");
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password, newsletter } = req.body;
  const salt = uid2(26);
  const hash = SHA256(password + salt).toString(encBase64);
  const token = uid2(16);
  try {
    const userSearched = await User.findOne({ email: email });
    if (!username) {
      return res.json({ message: "Username is required!" });
    } else if (!userSearched) {
      const user = new User({
        email: email,
        username: username,
        newsletter: newsletter,
        token: token,
        hash: hash,
        salt: salt,
      });
      await user.save();
      const userSearched = await User.findOne({ email: email });
      return res.json({
        _id: userSearched._id,
        token: token,
        username: username,
      });
    } else {
      return res.json({ message: "User already exist!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
