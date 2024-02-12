const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/filterComic", async (req, res) => {
  const { title, skipvalue, limitvalue } = req.query;
  const marvelApiKey = process.env.API_KEY;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${marvelApiKey}&title=${title}&skip=${skipvalue}&limit=${limitvalue}`
    );
    // console.log(response.data);
    const results = response.data;
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
