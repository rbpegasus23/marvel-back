const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`${process.env.MONGOOSE_URL}`);

const signup = require("./routes/signup");
const login = require("./routes/login");
const allcharacters = require("./routes/character");
const allComics = require("./routes/comic");
const bio = require("./routes/bio");
const infoComic = require("./routes/infoComic");
const filterCharacter = require("./routes/filterCharacter");
const filterComic = require("./routes/filterComic");
const favorisComics = require("./routes/favorisComics");
const favorisCharacters = require("./routes/favorisCharacters");
const favorite = require("./routes/favorite");

app.use(signup);
app.use(login);
app.use(allcharacters);
app.use(allComics);
app.use(bio);
app.use(infoComic);
app.use(filterCharacter);
app.use(filterComic);
app.use(favorisComics);
app.use(favorisCharacters);
app.use(favorite);

app.all("*", async (req, res) => {
  res.json({ message: "Cette page n'existe pas" });
});

app.listen(process.env.PORT || 3100, () => {
  console.log("Server started");
});
