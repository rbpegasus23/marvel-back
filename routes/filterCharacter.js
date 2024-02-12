const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/filterCharacter", async (req, res) => {
  const { name, skipvalue, limitvalue } = req.query;
  const marvelApiKey = process.env.API_KEY;

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${marvelApiKey}&name=${name}&skip=${skipvalue}&limit=${limitvalue}`
    );
    // console.log(response.data);
    const results = response.data;
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
