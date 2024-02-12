const express = require("express");
const User = require("../models/User");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email + password);

  try {
    const userSearched = await User.findOne({ email: email });
    console.log(userSearched);

    if (userSearched) {
      const hash = SHA256(password + userSearched.salt).toString(encBase64);
      if (hash === userSearched.hash) {
        return res.json({
          _id: userSearched._id,
          token: userSearched.token,
          username: userSearched.username,
        });
      } else {
        return res.json({ message: "Mot de passe incorrect" });
      }
    } else {
      return res.json({ message: "Ce compte n'existe pas" });
    }
  } catch (error) {
    res.json({
      message:
        "Nous ne pouvons pas vérifier vos identifiants pour le moment, merci de réessayer plus tard",
    });
  }
});

module.exports = router;
