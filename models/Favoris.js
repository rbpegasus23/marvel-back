const mongoose = require("mongoose");

const Favoris = mongoose.model("Favoris", {
  email: String,
  favoritesCharacters: [
    {
      imageId: String,
      imageUrl: String,
      description: String,
      name: String,
    },
  ],
  favoritesComics: [
    {
      imageId: String,
      imageUrl: String,
      description: String,
      title: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favoris;
