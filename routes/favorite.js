const express = require("express");
const axios = require("axios");
const Favoris = require("../models/Favoris");
const User = require("../models/User");

const router = express.Router();

router.get("/getFavorite", async (req, res) => {
  const { userToken } = req.query;
  const marvelApiKey = process.env.API_KEY;

  try {
    const userSearched = await User.findOne({ token: userToken });
    if (userSearched) {
      const favorite = await Favoris.findOne({ email: userSearched.email });
      if (favorite) {
        res.status(200).json({
          favoritesCharacters: favorite.favoritesCharacters,
          favoritesComics: favorite.favoritesComics,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
