const express = require("express");
const router = express.Router();
const db = require("./db.js");
const jwt = require("jsonwebtoken");

router.get("/whoami", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json("Unhauthorized, not a logged user");
    }
    const decoded = jwt.verify(token, "secret_key");
    const mongo = db.getDb();
    const user = await mongo
      .collection("users")
      .findOne({ "_id.username": decoded.id });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "HTTP internal server error" });
  }
});

module.exports = router;
