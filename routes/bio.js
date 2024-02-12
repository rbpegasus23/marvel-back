const express = require("express");
const axios = require("axios");
// const Ticket = require("../models/Ticket");
// const Event = require("../models/Event");

const router = express.Router();

router.get("/bio", async (req, res) => {
  const { id } = req.query;
  const marvelApiKey = process.env.API_KEY;
  // console.log(id);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${marvelApiKey}`
    );
    // console.log(response.data);
    const results = response.data;
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
