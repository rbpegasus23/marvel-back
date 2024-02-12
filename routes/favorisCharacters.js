const express = require("express");
const axios = require("axios");
const Favoris = require("../models/Favoris");
const User = require("../models/User");

const router = express.Router();

router.post("/postFavorisCharacters", async (req, res) => {
  const { id, imageUrl, userToken, name, description } = req.body;

  try {
    const userSearched = await User.findOne({ token: userToken });
    const informationFavoriteSelected = {
      imageId: id,
      imageUrl: imageUrl,
      description: description,
      name: name,
    };

    if (userSearched) {
      const favoriteSearchedOfUser = await Favoris.findOne({
        email: userSearched.email,
      });

      if (favoriteSearchedOfUser) {
        const favoriteAlreadyExist =
          favoriteSearchedOfUser.favoritesCharacters.some(
            (element) => element.imageId === id
          );

        if (favoriteAlreadyExist) {
          return res.json({ message: "This favorite have been already added" });
        } else {
          favoriteSearchedOfUser.favoritesCharacters.push(
            informationFavoriteSelected
          );

          await favoriteSearchedOfUser.save();
          res.status(200).json(favoriteSearchedOfUser);
        }
      } else {
        const newFavorite = new Favoris({
          email: userSearched.email,
          favoritesCharacters: [informationFavoriteSelected],
          user: userSearched.id,
        });
        await newFavorite.save();
        res.status(200).json(newFavorite);
      }
    } else {
      res.json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
